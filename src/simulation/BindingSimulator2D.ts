import { System, Circle, Response } from "detect-collisions";
import { find, random } from "lodash";
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

import { InputAgent, ProductName, StoredAgent } from "../types";
import { AGENT_AB_COLOR } from "../constants/colors";
import LiveSimulationData from "./LiveSimulationData";
import { LIVE_SIMULATION_NAME } from "../constants";
import BindingInstance from "./BindingInstance";

export default class BindingSimulator implements IClientSimulatorImpl {
    instances: BindingInstance[] = [];
    currentFrame: number;
    agents: StoredAgent[] = [];
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
        timeFactor: number = LiveSimulationData.DEFAULT_TIME_FACTOR
    ) {
        this.size = size;
        this.system = new System();
        this.createBoundingLines();
        this.distanceFactor = 40;
        this.timeFactor = timeFactor;
        this.agents = this.initializeAgents(agents);
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

    private initializeAgents(agents: InputAgent[]): StoredAgent[] {
        let largestRadius = 0;
        for (let i = 0; i < agents.length; ++i) {
            const agent = agents[i] as StoredAgent; // count is no longer optional
            // if this is called from the constructor, the count will be undefined
            // if it's called from update concentration
            // the count will already be set
            if (agent.count === undefined) {
                agent.count = this.convertConcentrationToCount(
                    agent.initialConcentration
                );
            }
            if (agent.radius > largestRadius) {
                // use the largest agent to check if the system is mixed
                largestRadius = agent.radius;
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
        return agents as StoredAgent[];
    }

    private countNumberOfInstancesOnEachSide(agentInstance: BindingInstance) {
        if (this._isMixed) {
            return;
        }
        if (agentInstance.id !== this.mixCheckAgent) {
            return;
        }

        // checking the rightmost third of the simulation
        // and the left most third of the simulation
        if (agentInstance.pos.x < -this.size / 3) {
            this.numberAgentOnLeft++;
        } else if (agentInstance.pos.x > this.size / 3) {
            this.numberAgentOnRight++;
        }
    }

    private compareAgentsOnEachSide() {
        // once the simulation is mixed, if it dips momentarily
        // that's not a sign that equilibrium has been reversed
        if (this._isMixed) {
            return;
        }

        // if either of the agents is a limiting reactant
        // then the system is mixed when it's been used up
        // even if the other agent is not evenly distributed
        let limitReached = false;
        this.agents.forEach((agent) => {
            const agentUnbound = agent.count - this.currentNumberBound;
            if ((agentUnbound / agent.count) * 100 < 10) {
                limitReached = true;
                return;
            }
        });
        if (limitReached) {
            this._isMixed = true;
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
        const buffer = size / 20;
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
        if (numberOfPasses > 8) {
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
                        if (overlap > 1) {
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
        const agent = find(this.agents, (agent) => agent.id === agentId);
        if (!agent) {
            return;
        }
        const newCount = this.convertConcentrationToCount(newConcentration);
        const oldCount = agent.count || 0;
        agent.count = newCount;
        agent.initialConcentration = newConcentration;
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

    public getCurrentConcentrations(product: ProductName) {
        const init = <{ [key: string]: number }>{};
        const concentrations = this.agents.reduce((acc, agent) => {
            acc[agent.name] = this.convertCountToConcentration(
                agent.count - this.currentNumberBound
            );
            return acc;
        }, init);
        concentrations[product] = this.convertCountToConcentration(
            this.currentNumberBound
        );
        return concentrations;
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
            const unbindingOccurred = this.instances[i].oneStep(
                this.size,
                this.timeFactor
            );
            if (unbindingOccurred) {
                this.currentNumberOfUnbindingEvents++;
                this.currentNumberBound--;
            }
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
                        unbound = b.checkWillUnbind(a);
                    } else {
                        // b is the ligand
                        unbound = a.checkWillUnbind(b);
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
                        bound = b.checkWillBind(a, overlapV);
                    } else {
                        // b is the ligand
                        bound = a.checkWillBind(b, overlapV);
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
                name: `${this.agents[i].name}`,
                geometry: {
                    color: this.agents[i].color,
                    displayType: GeometryDisplayType.SPHERE,
                    url: "",
                },
            };
            typeMapping[this.agents[i].id + 100] = {
                name: `${this.agents[i].name}#bound`,
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
            trajectoryTitle: LIVE_SIMULATION_NAME,
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
