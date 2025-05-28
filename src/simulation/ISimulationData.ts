import {
    AGENT_AB_COLOR,
    AGENT_AC_COLOR,
    AGENT_AD_COLOR,
    AGENT_A_COLOR,
    AGENT_B_COLOR,
    AGENT_C_COLOR,
    AGENT_D_COLOR,
} from "../constants/colors";
import {
    AgentType,
    AgentName,
    CurrentConcentration,
    InputAgent,
    Module,
    ProductName,
} from "../types";

export const AGENT_AND_PRODUCT_COLORS = {
    [AgentType.Fixed]: AGENT_A_COLOR,
    [AgentType.Adjustable_1]: AGENT_B_COLOR,
    [AgentType.Adjustable_2]: AGENT_C_COLOR,
    [AgentType.Competitor]: AGENT_D_COLOR,
    [AgentType.Complex_1]: AGENT_AB_COLOR,
    [AgentType.Complex_2]: AGENT_AC_COLOR,
    [AgentType.Complex_3]: AGENT_AD_COLOR,
};

export enum TrajectoryType {
    live = "live",
    precomputed = "precomputed",
}
interface ISimulationData {
    timeUnit: string;
    type: TrajectoryType;
    getCurrentProduct: (module: Module) => ProductName;
    getMaxConcentration: (module: Module) => number;
    getAgentFunction: (name: AgentName | ProductName) => AgentType;
    getAgentColor: (agentName: AgentName | ProductName) => string;
    getActiveAgents: (currentModule: Module) => AgentName[];
    getInitialConcentrations: (
        activeAgents: AgentName[],
        module: Module
    ) => CurrentConcentration;
    createAgentsFromConcentrations: () => InputAgent[] | null;
}

export default ISimulationData;
