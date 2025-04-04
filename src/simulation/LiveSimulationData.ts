import {
    AgentFunction,
    AgentName,
    CurrentConcentration,
    InputAgent,
    Module,
    ProductName,
} from "../types";
import {
    AGENT_A_COLOR,
    AGENT_B_COLOR,
    AGENT_C_COLOR,
} from "../constants/colors";
import ISimulationData, {
    AGENT_AND_PRODUCT_COLORS,
    TrajectoryType,
} from "./ISimulationData";
import { NANO } from "../constants";

const agentA: InputAgent = {
    id: 0,
    name: AgentName.A,
    initialConcentration: 0,
    radius: 3,
    partners: [1, 2],
    color: AGENT_A_COLOR,
};

const agentB: InputAgent = {
    id: 1,
    name: AgentName.B,
    initialConcentration: 0,
    radius: 1,
    partners: [0],
    kOn: 0.9,
    kOff: 0.01,
    color: AGENT_B_COLOR,
};

const agentC: InputAgent = {
    id: 2,
    name: AgentName.C,
    initialConcentration: 0,
    radius: 0.4,
    partners: [0],
    kOn: 0.3,
    kOff: 0.9,
    color: AGENT_C_COLOR,
};

const kds = {
    [Module.A_B_AB]: 0.75,
    [Module.A_C_AC]: 74,
    [Module.A_B_C_AB_AC]: 5,
};

export default class LiveSimulation implements ISimulationData {
    static NAME_TO_FUNCTION_MAP = {
        [AgentName.A]: AgentFunction.Fixed,
        [AgentName.B]: AgentFunction.Adjustable,
        [AgentName.C]: AgentFunction.Competitor,
        [ProductName.AB]: AgentFunction.Complex_1,
        [ProductName.AC]: AgentFunction.Complex_2,
    };
    static ADJUSTABLE_AGENT_MAP = {
        [Module.A_B_AB]: AgentName.B,
        [Module.A_C_AC]: AgentName.C,
        [Module.A_B_C_AB_AC]: AgentName.B,
    };
    static INITIAL_TIME_FACTOR: number = 30;
    static DEFAULT_TIME_FACTOR: number = 90;
    static AVAILABLE_AGENTS = {
        [AgentName.A]: agentA,
        [AgentName.B]: agentB,
        [AgentName.C]: agentC,
    };
    static INITIAL_CONCENTRATIONS = {
        [AgentName.A]: 10,
        [AgentName.B]: 4,
        [AgentName.C]: 30,
    };
    PRODUCT = {
        [Module.A_B_AB]: ProductName.AB,
        [Module.A_C_AC]: ProductName.AC,
        [Module.A_B_C_AB_AC]: ProductName.AB,
    };
    timeUnit = NANO;
    type = TrajectoryType.live;

    getCurrentProduct = (module: Module): ProductName => {
        return this.PRODUCT[module];
    };

    getAgentFunction = (name: AgentName | ProductName): AgentFunction => {
        return (
            LiveSimulation.NAME_TO_FUNCTION_MAP as Record<
                AgentName | ProductName,
                AgentFunction
            >
        )[name];
    };

    getAgentColor = (name: AgentName | ProductName): string => {
        const agentFunction = this.getAgentFunction(name);
        return AGENT_AND_PRODUCT_COLORS[agentFunction];
    };

    getMaxConcentration = (module: Module): number => {
        let maxConcentration = 0;
        switch (module) {
            case Module.A_B_AB:
                maxConcentration = 10;
                break;
            case Module.A_C_AC:
                maxConcentration = 75;
                break;
            case Module.A_B_C_AB_AC:
                maxConcentration = 20; //TODO: adjust these as needed
                break;
        }
        return maxConcentration;
    };

    createAgentsFromConcentrations = (
        activeAgents?: AgentName[]
    ): InputAgent[] => {
        return (activeAgents ?? []).map((agentName: AgentName) => {
            const agent = {
                ...(
                    LiveSimulation.AVAILABLE_AGENTS as Record<
                        AgentName,
                        InputAgent
                    >
                )[agentName],
            };
            agent.initialConcentration =
                LiveSimulation.INITIAL_CONCENTRATIONS[
                    agentName as keyof typeof LiveSimulation.INITIAL_CONCENTRATIONS
                ];
            return agent;
        });
    };

    getActiveAgents = (currentModule: Module): AgentName[] => {
        switch (currentModule) {
            case Module.A_B_AB:
                return [AgentName.A, AgentName.B];
            case Module.A_C_AC:
                return [AgentName.A, AgentName.C];
            case Module.A_B_C_AB_AC:
                return [AgentName.A, AgentName.B, AgentName.C];
            default:
                return [];
        }
    };
    // filters down to the active agents
    getInitialConcentrations = (
        activeAgents: AgentName[]
    ): CurrentConcentration => {
        return activeAgents.reduce((acc, agent) => {
            return {
                ...acc,
                [agent]:
                    LiveSimulation.INITIAL_CONCENTRATIONS[
                        agent as keyof typeof LiveSimulation.INITIAL_CONCENTRATIONS
                    ],
            };
        }, {});
    };
    getKd = (module: Module): number => {
        return kds[module];
    };
}
