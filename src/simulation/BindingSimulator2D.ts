import { System, Circle, Response } from "detect-collisions";
import { random } from "lodash";
import { Vector } from "sat";

import {
    IClientSimulatorImpl,
    ClientMessageEnum,
    GeometryDisplayType,
    EncodedTypeMapping,
    TrajectoryFileInfo,
    VisDataMessage,
    DEFAULT_CAMERA_SPEC,
    VisTypes,
} from "@aics/simularium-viewer";
import { InputAgent } from "../types";
import { AGENT_AB_COLOR } from "../constants/colors";
import { DEFAULT_TIME_FACTOR } from "../constants/trajectories";

class BindingInstance extends Circle {
    id: number;
    child: BindingInstance | null;
    parent: BindingInstance | null;
    bound: boolean;
    partners: number[];
    kOn?: number;
    kOff?: number;
    constructor(
        circle: Circle,
        id: number,
        partners: number[],
        kOn?: number,
        kOff?: number
    ) {
        super(circle.pos, circle.r);
        this.id = id;
        this.partners = partners;
        this.bound = false;
        this.child = null;
        this.parent = null;
        this.kOn = kOn;
        this.kOff = kOff;
    }

    private rotate(x: number, y: number, angle: number, center: number[]) {
        // center of rotation is (𝛼,𝛽) and the rotation angle is 𝜃
        //(𝑥,𝑦)↦(𝑥′,𝑦′)=(𝛼+(𝑥−𝛼)cos𝜃−(𝑦−𝛽)sin𝜃, 𝛽+(𝑥−𝛼)sin𝜃+(𝑦−𝛽)cos𝜃).
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const newX = center[0] + (x - center[0]) * cos - (y - center[1]) * sin;
        const newY = center[1] + (x - center[0]) * sin + (y - center[1]) * cos;
        return [newX, newY];
    }

    private findCenter(agent: BindingInstance, ligand: BindingInstance) {
        const dx = ligand.pos.x - agent.pos.x;
        const dy = ligand.pos.y - agent.pos.y;
        const halfdx = dx / 2;
        const halfdy = dy / 2;
        const x = agent.pos.x + halfdx;
        const y = agent.pos.y + halfdy;
        return [x, y];
    }

    private releaseFromParent() {
        this.isTrigger = false;
        this.bound = false;
        this.parent = null;
    }

    private bindToParent(
        parent: BindingInstance,
        overlapV: Vector
    ): BindingInstance {
        this.isTrigger = true;
        this.parent = parent;
        // adjust the ligand to the exact edge of the parent
        this.move(-overlapV.x, -overlapV.y);
        this.bound = true;
        return this;
    }

    /** PUBLIC METHODS BELOW */

    public move(x: number, y: number) {
        if (this.parent) {
            this.parent.move(x, y);
        } else {
            this.setPosition(this.pos.x + x, this.pos.y + y);
            if (this.child) {
                this.child.setPosition(
                    this.child.pos.x + x,
                    this.child.pos.y + y
                );
            }
        }
    }

    public isBoundPair(other: BindingInstance) {
        return this.child == other || other.child == this;
    }

    public rotateGroup(xStep: number, yStep: number) {
        if (!this.child) {
            return;
        }
        const angle = random(-Math.PI / 4, Math.PI / 4, true);
        const center = this.findCenter(this, this.child);
        const newCirclePosition = this.rotate(
            this.pos.x,
            this.pos.y,
            angle,
            center
        );
        this.setPosition(newCirclePosition[0], newCirclePosition[1]);
        const childPosX = this.child.pos.x + xStep;
        const childPosY = this.child.pos.y + yStep;
        const childPosAndRotation = this.rotate(
            childPosX,
            childPosY,
            angle,
            center
        );
        this.child.setPosition(childPosAndRotation[0], childPosAndRotation[1]);
    }

    public oneStep(size: number, timeFactor: number = DEFAULT_TIME_FACTOR) {
        if (this.bound) {
            return;
        }
        // D(r)≈(4.10901922×10^−3)/r nm^2/s
        const diffusionCoefficient = (4 * 10 ** -3) / this.r;

        const amplitude = Math.sqrt(2 * diffusionCoefficient) * timeFactor;
        let xStep = random(-amplitude, amplitude, true);
        let yStep = random(-amplitude, amplitude, true);
        const posX = this.pos.x + xStep;
        const posY = this.pos.y + yStep;
        const edge = size / 2;

        if (posX > edge + this.r) {
            const over = posX - edge;
            xStep = xStep - over;
        }
        if (posX < -edge - this.r) {
            const over = posX + edge;
            xStep = xStep - over;
        }
        if (posY > edge + this.r) {
            yStep = yStep - size;
        }
        if (posY < -edge - this.r) {
            yStep = size + yStep;
        }
        this.setPosition(this.pos.x + xStep, this.pos.y + yStep);
        if (this.child) {
            this.rotateGroup(xStep, yStep);
        }
    }

    public checkWillUnbind(ligand: BindingInstance): boolean {
        if (ligand.kOff === undefined) {
            return false;
        }
        const willUnBind = random(0, 1, true) < ligand.kOff;
        if (!willUnBind) {
            return false;
        }
        this.child = null;
        this.isTrigger = false;
        ligand.releaseFromParent();
        // QUESTION: should the ligand be moved to a random position?
        return true;
    }

    public checkWillBind(possibleLigand: BindingInstance, overlapV: Vector): boolean {
        if (possibleLigand.bound || this.child) {
            // already have bound ligand or already bound
            // can't bind to another ligand
            return false;
        }
        if (possibleLigand.kOn === undefined) {
            return false;
        }
        const willBind = random(0, 1, true) < possibleLigand.kOn;
        if (!willBind) {
            return false;
        }
        this.isTrigger = true;
        const ligand = possibleLigand.bindToParent(this, overlapV);
        this.child = ligand;
        return true;
    }
}

export default class BindingSimulator implements IClientSimulatorImpl {
    instances: BindingInstance[] = [];
    currentFrame: number;
    agents: InputAgent[] = [];
    system: System;
    distanceFactor: number;
    timeFactor: number;
    static: boolean = false;
    initialState: boolean = true;
    currentNumberBound: number = 0;
    currentNumberOfBindingEvents: number = 0;
    currentNumberOfUnbindingEvents: number = 0;
    onUpdate: (data: number) => void = () => {};
    mixCheckAgent: number = 0;
    numberAgentOnLeft: number = 0;
    numberAgentOnRight: number = 0;
    _isMixed: boolean = false;
    size: number;
    constructor(
        agents: InputAgent[],
        size: number,
        timeFactor: number = DEFAULT_TIME_FACTOR
    ) {
        this.size = size;
        this.system = new System();
        this.agents = agents;
        this.createBoundingLines();
        this.distanceFactor = 40;
        this.timeFactor = timeFactor;
        this.initializeAgents(agents);
        this.currentFrame = 0;
        this.system.separate();
    }

    private clearAgents() {
        this.currentNumberBound = 0;
        this.currentNumberOfBindingEvents = 0;
        this.currentNumberOfUnbindingEvents = 0;
        this.system = new System();
        this.instances = [];
        this._isMixed = false;
    }

    private initializeAgents(agents: InputAgent[]) {
        let smallestAgentRadius = 1000;
        for (let i = 0; i < agents.length; ++i) {
            const agent = agents[i];
            agent.count = this.convertConcentrationToCount(agent.concentration);
            if (agent.radius < smallestAgentRadius) {
                // use the smallest agent to check if the system is mixed
                smallestAgentRadius = agent.radius;
                this.mixCheckAgent = agent.id;
            }
            for (let j = 0; j < agent.count; ++j) {
                const position: number[] = this.getRandomPointOnSide(
                    agent.id,
                    agents.length
                );
                const circle = new Circle(
                    new Vector(...position),
                    agent.radius
                );
                const instance = new BindingInstance(
                    circle,
                    agent.id,
                    agent.partners,
                    agent.kOn,
                    agent.kOff
                );
                this.system.insert(instance);
                this.instances.push(instance);
            }
        }
    }

    private countNumberOfInstancesOnEachSide(agentInstance: BindingInstance) {
        if (this._isMixed) {
            return;
        }
        if (agentInstance.id !== this.mixCheckAgent) {
            return;
        }

        // checking the rightmost quadrant
        // and the left most quadrant
        if (agentInstance.pos.x < -this.size / 4) {
            this.numberAgentOnLeft++;
        } else if (agentInstance.pos.x > this.size / 4) {
            this.numberAgentOnRight++;
        }
    }

    private compareAgentsOnEachSide() {
        // once the simulation is mixed, if it dips momentarily
        // that's not a sign that equilibrium has been reversed
        if (this._isMixed) {
            return;
        }
        const diff = Math.abs(this.numberAgentOnLeft - this.numberAgentOnRight);
        const total = this.numberAgentOnLeft + this.numberAgentOnRight;
        const percentUnmixed = (diff / total) * 100;
        if (percentUnmixed < 10) {
            this._isMixed = true;
        }
    }

    private clearMixCounts() {
        this.numberAgentOnLeft = 0;
        this.numberAgentOnRight = 0;
    }

    private createBoundingLines() {
        const size = this.size;
        const points = [
            [-size / 2, -size / 2],
            [-size / 2, size / 2],
            [size / 2, size / 2],
            [size / 2, -size / 2],
        ];
        points.forEach((point, index) => {
            const nextPoint = points[(index + 1) % points.length];
            this.system.createLine(
                new Vector(point[0], point[1]),
                new Vector(nextPoint[0], nextPoint[1]),
                { isStatic: true }
            );
        });
    }

    private convertConcentrationToCount(concentration: number) {
        // calculating the number of particles in the volume
        // from the concentration in uM (micromoles per liter)
        // volume is in nm^3
        // 1 nm^3 = 10^-24 L
        // 1 mole = 10^6 micromoles
        // 10 ^(-24 - 6 + 23) = 10^-7
        const depth = 1.0;
        const size = this.size;
        const volume =
            size * this.distanceFactor * (size * this.distanceFactor) * depth;
        const count = concentration * volume * 10 ** -7 * 6.022;
        return count;
    }

    private convertCountToConcentration(count: number) {
        // calculating the concentration in uM (micromoles per liter)
        // volume is in nm^3 and count is the number of particles
        // 1 nm^3 = 10^-24 L
        // 1 mole = 6.022 x 10^23 particles (count)
        const depth = 1.0;
        const size = this.size;
        const volume =
            size * this.distanceFactor * (size * this.distanceFactor) * depth;
        const concentration = count / (volume * 10 ** -7 * 6.022);
        return concentration;
    }

    private getRandomPointOnSide(side: number, total: number) {
        const size = this.size;
        const buffer = size / 5;
        const dFromSide = random(0 + buffer, size / 2, true);
        let dAlongSide = random(-size / 2, size / 2, true);

        if (total > 2 && side === 1) {
            dAlongSide = random(0, size / 2, true);
        } else if (total > 2 && side === 2) {
            dAlongSide = random(-size / 2, 0, true);
        }
        switch (side) {
            case 0:
                return [-dFromSide, dAlongSide];
            case 1:
                return [dFromSide, dAlongSide];
            case 2:
                return [dFromSide, dAlongSide];
            default:
                return [dFromSide, dAlongSide];
        }
    }

    private resolveCollision(
        a: BindingInstance,
        b: BindingInstance,
        overlapV: Vector,
        numberOfPasses: number = 0
    ) {
        let toCheck = null;
        const { x, y } = overlapV;
        // if neither is a trigger, then they
        // will both get moved by system.separate()
        if (!a.isTrigger && !b.isTrigger) {
            return;
        }
        if (numberOfPasses > 5) {
            return;
        }

        // prefer to move an instance that is not bound, ie, not isTrigger
        // because after it's moved any additional overlaps will be resolved by the system
        if (!a.isTrigger) {
            a.move(-x, -y);
            toCheck = a;
        } else if (!b.isTrigger && b.type === "Circle") {
            b.move(x, y);
            toCheck = b;
        } else {
            a.move(-x, -y);
            toCheck = a;
        }
        if (toCheck) {
            numberOfPasses++;
            // after moving the instance, check if it overlaps with any other instance
            this.system.checkOne(toCheck, (response: Response) => {
                if (response) {
                    const { a, b, overlapV, overlap } = response;
                    if (!a.isBoundPair(b)) {
                        // This check is to keep from having to resolve
                        // a ridiculous number of collisions
                        // the value is half the radius of the larger agent
                        if (overlap > 1.5) {
                            return this.resolveCollision(
                                a,
                                b,
                                overlapV,
                                numberOfPasses
                            );
                        }
                    }
                }
            });
        }
    }

    private relax(maxCycles: number = 30) {
        let cycles = 0;
        while (cycles < maxCycles) {
            cycles++;
            this.system.separate();
        }
    }

    /** PUBLIC METHODS BELOW */

    public isMixed() {
        return this._isMixed;
    }

    public getEvents() {
        return {
            numberBindEvents: this.currentNumberOfBindingEvents,
            numberUnBindEvents: this.currentNumberOfUnbindingEvents,
        };
    }

    public changeConcentration(agentId: number, newConcentration: number) {
        const agent = this.agents.find((agent) => agent.id === agentId);
        if (!agent) {
            return;
        }
        const newCount = this.convertConcentrationToCount(newConcentration);
        const oldCount = agent.count || 0;
        agent.count = newCount;
        this.static = true;
        if (!this.initialState) {
            // if the simulation has played, it needs to be reset to the
            // initial state
            this.clearAgents();
            this.initialState = true;
            this.initializeAgents(this.agents);
            return;
        }
        const diff = newCount - oldCount;
        if (diff > 0) {
            for (let i = 0; i < diff; ++i) {
                const position: number[] = this.getRandomPointOnSide(
                    agent.id,
                    this.agents.length
                );
                const circle = new Circle(
                    new Vector(...position),
                    agent.radius
                );
                const instance = new BindingInstance(
                    circle,
                    agent.id,
                    agent.partners,
                    agent.kOn,
                    agent.kOff
                );
                this.system.insert(instance);
                this.instances.push(instance);
            }
        } else if (diff < 0) {
            const toRemove = this.instances.filter(
                (instance) => instance.id === agentId
            );
            for (let i = 0; i < Math.abs(diff); ++i) {
                const instance = toRemove[i];
                this.system.remove(instance);
                this.instances.splice(this.instances.indexOf(instance), 1);
            }
        }
    }

    public updateSimulationState() {
        // TODO a type definition to show the possible fields
        // data: {
        //     agents: {
        //         "1": {
        //             _updater: "accumulate",
        //             position: [0.1, 0, 0],
        //         },
        //     },
        // },
    }

    public setTimeScale(timeScale: number) {
        this.timeFactor = timeScale;
    }

    public getCurrentConcentrationBound() {
        return this.convertCountToConcentration(this.currentNumberBound);
    }

    public staticUpdate() {
        // update the number of agents without
        // changing their positions
        this.relax();

        const agentData: number[] = [];
        for (let ii = 0; ii < this.instances.length; ++ii) {
            const instance = this.instances[ii];
            agentData.push(VisTypes.ID_VIS_TYPE_DEFAULT); // vis type
            agentData.push(ii); // instance id
            agentData.push(
                instance.bound || instance.child
                    ? 100 + instance.id
                    : instance.id
            ); // type
            agentData.push(instance.pos.x); // x
            agentData.push(instance.pos.y); // y
            agentData.push(0); // z
            agentData.push(0); // rx
            agentData.push(0); // ry
            agentData.push(0); // rz
            agentData.push(instance.r); // collision radius
            agentData.push(0); // subpoints
        }
        const frameData: VisDataMessage = {
            // TODO get msgType out of here
            msgType: ClientMessageEnum.ID_VIS_DATA_ARRIVE,
            bundleStart: this.currentFrame,
            bundleSize: 1, // frames
            bundleData: [
                {
                    data: agentData,
                    frameNumber: this.currentFrame,
                    time: this.currentFrame,
                },
            ],
            fileName: "hello world",
        };
        this.static = false;
        this.currentFrame++;
        return frameData;
    }

    public update(): VisDataMessage {
        if (this.static || this.initialState) {
            return this.staticUpdate();
        }
        this.clearMixCounts();

        for (let i = 0; i < this.instances.length; ++i) {
            this.instances[i].oneStep(this.size, this.timeFactor);
            this.countNumberOfInstancesOnEachSide(this.instances[i]);
        }
        // reset to zero for every tenth time point
        if (this.currentFrame % 10 === 0) {
            this.currentNumberOfBindingEvents = 0;
            this.currentNumberOfUnbindingEvents = 0;
            this.compareAgentsOnEachSide();
        }
        this.system.checkAll((response: Response) => {
            const { a, b, overlapV } = response;

            if (response) {
                // if they are bound, check if they should unbind
                if (a.isBoundPair(b)) {
                    let unbound = false;
                    if (a.r < b.r) {
                        unbound = b.unBind(a);
                    } else {
                        // b is the ligand
                        unbound = a.unBind(b);
                    }
                    if (unbound) {
                        this.currentNumberOfUnbindingEvents++;
                        this.currentNumberBound--;
                    }
                }
                if (a.partners.includes(b.id)) {
                    // a is the ligand
                    let bound = false;
                    if (a.r < b.r) {
                        bound = b.bind(a, overlapV);
                    } else {
                        // b is the ligand
                        bound = a.bind(b, overlapV);
                    }
                    if (bound) {
                        this.currentNumberOfBindingEvents++;
                        this.currentNumberBound++;
                    }
                }
                // Now that binding has been resolved, resolve collisions
                // if they are not bound the system will resolve the collision
                if (!a.isBoundPair(b)) {
                    if (!a.isStatic && !b.isStatic) {
                        this.resolveCollision(a, b, overlapV);
                    }
                }
            } else {
                console.log("no response");
            }
        });
        this.relax(5);
        // fill agent data.
        const agentData: number[] = [];

        for (let ii = 0; ii < this.instances.length; ++ii) {
            const instance = this.instances[ii];
            agentData.push(VisTypes.ID_VIS_TYPE_DEFAULT); // vis type
            agentData.push(ii); // instance id
            agentData.push(
                instance.bound || instance.child
                    ? 100 + instance.id
                    : instance.id
            ); // type
            agentData.push(instance.pos.x); // x
            agentData.push(instance.pos.y); // y
            agentData.push(0); // z
            agentData.push(0); // rx
            agentData.push(0); // ry
            agentData.push(0); // rz
            agentData.push(instance.r); // collision radius
            agentData.push(0); // subpoints
        }
        const frameData: VisDataMessage = {
            // TODO get msgType out of here
            msgType: ClientMessageEnum.ID_VIS_DATA_ARRIVE,
            bundleStart: this.currentFrame,
            bundleSize: 1, // frames
            bundleData: [
                {
                    data: agentData,
                    frameNumber: this.currentFrame,
                    time: this.currentFrame,
                },
            ],
            fileName: "hello world",
        };

        this.currentFrame++;
        return frameData;
    }

    public getPlotData() {
        return {
            plotData: [],
        };
    }

    public getInfo(): TrajectoryFileInfo {
        const typeMapping: EncodedTypeMapping = {};
        const size = this.size;
        for (let i = 0; i < this.agents.length; ++i) {
            typeMapping[this.agents[i].id] = {
                name: `${this.agents[i].id}`,
                geometry: {
                    color: this.agents[i].color,
                    displayType: GeometryDisplayType.SPHERE,
                    url: "",
                },
            };
            typeMapping[this.agents[i].id + 100] = {
                name: `${this.agents[i].id}#bound`,
                geometry: {
                    color: AGENT_AB_COLOR,
                    displayType: GeometryDisplayType.SPHERE,
                    url: "",
                },
            };
        }
        return {
            // TODO get msgType and connId out of here
            connId: "hello world",
            msgType: ClientMessageEnum.ID_TRAJECTORY_FILE_INFO,
            version: 3,
            timeStepSize: 1,
            totalSteps: 1000,
            // bounding volume dimensions
            size: {
                x: size,
                y: size,
                z: 1,
            },
            cameraDefault: {
                ...DEFAULT_CAMERA_SPEC,
                position: {
                    x: 0,
                    y: 0,
                    z: 65,
                },
            },
            typeMapping: typeMapping,
            spatialUnits: {
                magnitude: this.distanceFactor,
                name: "nm",
            },
            timeUnits: {
                magnitude: this.timeFactor,
                name: "ns",
            },
        };
    }
}
