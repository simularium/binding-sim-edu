import LiveSimulationData from "../../simulation/LiveSimulationData";
import { AgentName } from "../../types";

export const DEFAULT_INPUT_CONCENTRATION = {
    [AgentName.A]: LiveSimulationData.INITIAL_CONCENTRATIONS[AgentName.A],
    [AgentName.B]: LiveSimulationData.INITIAL_CONCENTRATIONS[AgentName.B],
};

const DEFAULT_ANALYSIS_STATE = {
    currentProductConcentrationArray: [],
    productOverTimeTraces: [],
    equilibriumConcentrations: {
        inputConcentrations: [],
        productConcentrations: [],
    },
};

export default DEFAULT_ANALYSIS_STATE;
