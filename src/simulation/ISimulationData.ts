import {
    AGENT_AB_COLOR,
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
    [AgentFunction.Complex]: AGENT_AB_COLOR,
};
interface ISimulationData {
    getCurrentProduct: (module: Module) => ProductName;
    getAgentColor: (agentName: AgentName) => string;
    getMaxConcentration: (module: Module) => number;
    getActiveAgents: (reactionType: Module) => AgentName[];
    getInitialConcentrations: (
        activeAgents: AgentName[]
    ) => CurrentConcentration;
    createAgentsFromConcentrations: (
        activeAgents?: AgentName[]
    ) => InputAgent[] | null;
}

export default ISimulationData;
