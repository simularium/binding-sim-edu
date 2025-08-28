import {
    AgentType,
    AgentName,
    CurrentConcentration,
    InputAgent,
    Module,
    ProductName,
} from "../types";
import {
    AGENT_A_COLOR,
    AGENT_AB_COLOR,
    AGENT_AC_COLOR,
    AGENT_AD_COLOR,
    AGENT_B_COLOR,
    AGENT_C_COLOR,
    AGENT_D_COLOR,
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
    partners: [1, 2, 3],
    color: AGENT_A_COLOR,
};

const agentB: InputAgent = {
    id: 1,
    name: AgentName.B,
    initialConcentration: 0,
    radius: 1,
    partners: [0],
    kOn: 0.95,
    kOff: 0.01,
    color: AGENT_B_COLOR,
    complexColor: AGENT_AB_COLOR,
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
    complexColor: AGENT_AC_COLOR,
};

const agentD: InputAgent = {
    id: 3,
    name: AgentName.D,
    initialConcentration: 0,
    radius: 1.2,
    partners: [0],
    kOn: 0.99,
    kOff: 0.001,
    color: AGENT_D_COLOR,
    complexColor: AGENT_AD_COLOR,
};

const kds = {
    [Module.A_B_AB]: 0.75,
    [Module.A_C_AC]: 74,
    [Module.A_B_D_AB]: 1.5,
};

export default class LiveSimulation implements ISimulationData {
    static NAME_TO_TYPE_MAP = {
        [AgentName.A]: AgentType.Fixed,
        [AgentName.B]: AgentType.Adjustable_1,
        [AgentName.C]: AgentType.Adjustable_2,
        [AgentName.D]: AgentType.Competitor,
        [ProductName.AB]: AgentType.Complex_1,
        [ProductName.AC]: AgentType.Complex_2,
        [ProductName.AD]: AgentType.Complex_3,
    };
    static ADJUSTABLE_AGENT_MAP = {
        [Module.A_B_AB]: AgentName.B,
        [Module.A_C_AC]: AgentName.C,
        [Module.A_B_D_AB]: AgentName.D,
    };
    static INITIAL_TIME_FACTOR: number = 30;
    static DEFAULT_TIME_FACTOR: number = 90;
    static AVAILABLE_AGENTS = {
        [AgentName.A]: agentA,
        [AgentName.B]: agentB,
        [AgentName.C]: agentC,
        [AgentName.D]: agentD,
    };
    static INITIAL_CONCENTRATIONS = {
        [Module.A_B_AB]: {
            [AgentName.A]: 5,
            [AgentName.B]: 4,
        },
        [Module.A_C_AC]: {
            [AgentName.A]: 5,
            [AgentName.C]: 30,
        },
        [Module.A_B_D_AB]: {
            [AgentName.A]: 2,
            [AgentName.B]: 2,
            [AgentName.D]: 2,
        },
    };
    // for competitive binding we want to start the experiment with zero D but
    // still have it in the introduction
    static EXPERIMENT_CONCENTRATIONS = {
        ...this.INITIAL_CONCENTRATIONS,
        [Module.A_B_D_AB]: {
            ...this.INITIAL_CONCENTRATIONS[Module.A_B_D_AB],
            [AgentName.D]: 0,
        },
    };
    PRODUCT = {
        [Module.A_B_AB]: ProductName.AB,
        [Module.A_C_AC]: ProductName.AC,
        [Module.A_B_D_AB]: ProductName.AB,
    };
    timeUnit = NANO;
    type = TrajectoryType.live;

    getCurrentProduct = (module: Module): ProductName => {
        return this.PRODUCT[module];
    };

    getAgentFunction = (name: AgentName | ProductName): AgentType => {
        return (
            LiveSimulation.NAME_TO_TYPE_MAP as Record<
                AgentName | ProductName,
                AgentType
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
                maxConcentration = 5;
                break;
            case Module.A_C_AC:
                maxConcentration = 75;
                break;
            case Module.A_B_D_AB:
                maxConcentration = 10;
                break;
        }
        return maxConcentration;
    };

    createAgentsFromConcentrations = (
        activeAgents?: AgentName[],
        module?: Module,
        isExperiment: boolean = false
    ): InputAgent[] => {
        if (!module) {
            throw new Error("Module must be specified to create agents.");
        }
        if (!activeAgents) {
            activeAgents = this.getActiveAgents(module);
        }
        const concentrations = this.getInitialConcentrations(
            activeAgents,
            module,
            isExperiment
        );
        return (activeAgents ?? []).map((agentName: AgentName) => {
            const agent = {
                ...(
                    LiveSimulation.AVAILABLE_AGENTS as Record<
                        AgentName,
                        InputAgent
                    >
                )[agentName],
            };

            agent.initialConcentration = concentrations[agentName] ?? 0;
            return agent;
        });
    };

    getActiveAgents = (currentModule: Module): AgentName[] => {
        switch (currentModule) {
            case Module.A_B_AB:
                return [AgentName.A, AgentName.B];
            case Module.A_C_AC:
                return [AgentName.A, AgentName.C];
            case Module.A_B_D_AB:
                return [AgentName.A, AgentName.B, AgentName.D];
            default:
                return [];
        }
    };
    // filters down to the active agents
    getInitialConcentrations = (
        activeAgents: AgentName[],
        module: Module,
        isExperiment: boolean = false
    ): CurrentConcentration => {
        const concentrations = isExperiment
            ? { ...LiveSimulation.EXPERIMENT_CONCENTRATIONS[module] }
            : { ...LiveSimulation.INITIAL_CONCENTRATIONS[module] };
        return activeAgents.reduce((acc, agent) => {
            return {
                ...acc,
                [agent]: (concentrations as Record<AgentName, number>)[agent],
            };
        }, {});
    };
    getKd = (module: Module): number => {
        return kds[module];
    };
}
