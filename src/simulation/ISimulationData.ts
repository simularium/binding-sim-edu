import {
    AGENT_AB_COLOR,
    AGENT_AC_COLOR,
    AGENT_A_COLOR,
    AGENT_B_COLOR,
    AGENT_C_COLOR,
} from "../constants/colors";
import {
    AgentFunction,
    AgentName,
    CurrentConcentration,
    InputAgent,
    Module,
    ProductName,
} from "../types";

export const AGENT_AND_PRODUCT_COLORS = {
    [AgentFunction.Fixed]: AGENT_A_COLOR,
    [AgentFunction.Adjustable]: AGENT_B_COLOR,
    [AgentFunction.Competitor]: AGENT_C_COLOR,
    [AgentFunction.Complex_1]: AGENT_AB_COLOR,
    [AgentFunction.Complex_2]: AGENT_AC_COLOR,
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
    getAgentFunction: (name: AgentName | ProductName) => AgentFunction;
    getAgentColor: (agentName: AgentName | ProductName) => string;
    getActiveAgents: (currentModule: Module) => AgentName[];
    getInitialConcentrations: (
        activeAgents: AgentName[]
    ) => CurrentConcentration;
    createAgentsFromConcentrations: () => InputAgent[] | null;
}

export default ISimulationData;
