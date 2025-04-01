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
    currentComplexMap: Map<string, number> = new Map();
    currentNumberOfBindingEvents: number = 0;
    currentNumberOfUnbindingEvents: number = 0;
    onUpdate: (data: number) => void = () => {};
    mixCheckAgent: number = 0;
    numberAgentOnLeft: number = 0;
    numberAgentOnRight: number = 0;
    productColor: Map<number, string>;
    size: number;
    constructor(
        agents: InputAgent[],
        size: number,
        timeFactor: number = LiveSimulationData.DEFAULT_TIME_FACTOR
    ) {
        this.size = size;
        this.productColor = new Map();
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
        this.productMap.clear();
        this.productColor.clear();
        this.currentNumberOfBindingEvents = 0;
        this.currentNumberOfUnbindingEvents = 0;
        this.system = new System();
        this.instances = [];
    }

    private getProductName(agent1: InputAgent, agent2: InputAgent) {
        const name1 = agent1.name;
        const name2 = agent2.name;
        if (agent1.id > agent2.id) {
            return `${name2}#${name1}`;
        } else {
            return `${name1}#${name2}`;
        }
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
            if (agent.complexColor) {
                this.productColor.set(agent.id, agent.complexColor);
            }
            if (agent.partners.length > 0) {
                for (let j = 0; j < agent.partners.length; ++j) {
                    const partnerId = agent.partners[j];
                    const partner = agents.find((a) => a.id === partnerId);
                    if (!partner) {
                        continue;
                    }
                    const complexName = this.getProductName(agent, partner);
                    this.currentComplexMap.set(complexName, 0);
                }
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

    private relax(maxCycles: number = 30) {
        let cycles = 0;
        while (cycles < maxCycles) {
            cycles++;
            this.system.separate();
        }
    }

    /** PUBLIC METHODS BELOW */

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

    private getAgentData() {
        const agentData: number[] = [];
        for (let ii = 0; ii < this.instances.length; ++ii) {
            const instance = this.instances[ii];
            let typeId = instance.id;
            if (instance.parent) {
                typeId = this.getBoundTypeId(instance.id, instance.parent.id);
            } else if (instance.child) {
                typeId = this.getBoundTypeId(instance.id, instance.child.id);
            }
            agentData.push(VisTypes.ID_VIS_TYPE_DEFAULT); // vis type
            agentData.push(ii); // instance id
            agentData.push(typeId); // type
            agentData.push(instance.pos.x); // x
            agentData.push(instance.pos.y); // y
            agentData.push(0); // z
            agentData.push(0); // rx
            agentData.push(0); // ry
            agentData.push(0); // rz
            agentData.push(instance.r); // collision radius
            agentData.push(0); // subpoints
        }
        return agentData;
    }

    private updateAgentsPositions() {
        for (let i = 0; i < this.instances.length; ++i) {
            const unbindingOccurred = this.instances[i].oneStep(
                this.size,
                this.timeFactor
            );
            if (unbindingOccurred) {
                this.currentNumberOfUnbindingEvents++;
                this.currentNumberBound--;
            }
        }
    }

    private resolveChildPositions() {
        for (let i = 0; i < this.instances.length; ++i) {
            const instance = this.instances[i];
            // if the instance is a child, we're going to move it to be
            // perfectly bound to its parent (with a slight overlap)
            if (instance.parent) {
                const bindingOverlap = instance.r * 0.5;
                const parentPosition = instance.parent.pos;
                const childPosition = instance.pos;
                const distanceVector = new Vector(
                    childPosition.x - parentPosition.x,
                    childPosition.y - parentPosition.y
                );
                const distance = Math.sqrt(
                    distanceVector.x ** 2 + distanceVector.y ** 2
                );
                const perfectBoundDistance =
                    instance.parent.r + instance.r - bindingOverlap;
                const tolerance = 0.1;
                if (Math.abs(distance - perfectBoundDistance) > tolerance) {
                    const ratio = perfectBoundDistance / distance;
                    const x = parentPosition.x + distanceVector.x * ratio;
                    const y = parentPosition.y + distanceVector.y * ratio;
                    instance.setPosition(x, y);
                }
            }
        }
    }

    private resolveBindingReactions() {
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
            } else {
                console.log("no response");
            }
        });
    }

    public update(): VisDataMessage {
        let agentData: number[] = [];
        if (this.static || this.initialState) {
            // update number of agents
            // without changing positions
            this.relax();
            agentData = this.getAgentData();
            this.static = false;
        } else {
            this.updateAgentsPositions();
            // reset to zero for every tenth time point
            if (this.currentFrame % 10 === 0) {
                this.currentNumberOfBindingEvents = 0;
                this.currentNumberOfUnbindingEvents = 0;
            }
            this.resolveBindingReactions();
            this.relax(3);
            this.resolveChildPositions();
            agentData = this.getAgentData();
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

    private getBoundTypeId(id: number, partnerId: number) {
        return 100 + id * 10 + partnerId;
    }

    public getInfo(): TrajectoryFileInfo {
        const typeMapping: EncodedTypeMapping = {};
        const size = this.size;
        for (let i = 0; i < this.agents.length; ++i) {
            const id = this.agents[i].id;
            typeMapping[id] = {
                name: `${this.agents[i].name}`,
                geometry: {
                    color: this.agents[i].color,
                    displayType: GeometryDisplayType.SPHERE,
                    url: "",
                },
            };
            if (this.agents[i].partners.length > 0) {
                for (let j = 0; j < this.agents[i].partners.length; ++j) {
                    const partnerId = this.agents[i].partners[j];
                    const complexId = this.getBoundTypeId(id, partnerId);
                    const partner = this.agents.find((a) => a.id === partnerId);
                    if (!partner) {
                        continue;
                    }
                    typeMapping[complexId] = {
                        name: `${this.agents[i].name}#${this.agents[partnerId].name}`,
                        geometry: {
                            color:
                                this.productColor.get(partnerId) ||
                                this.productColor.get(id) ||
                                "",
                            displayType: GeometryDisplayType.SPHERE,
                            url: "",
                        },
                    };
                }
            }
        }
        console.log("typeMapping", typeMapping);
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
                    z: 70,
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
