import LiveSimulationData from "../../simulation/LiveSimulationData";
import { AgentName, ProductName } from "../../types";

const LIVE_EVENTS_DEFAULT_STATE = {
    recordedConcentrations: [],
    liveConcentration: {
        [AgentName.A]: LiveSimulationData.INITIAL_CONCENTRATIONS[AgentName.A],
        [AgentName.B]: LiveSimulationData.INITIAL_CONCENTRATIONS[AgentName.B],
        [ProductName.AB]: 0,
    },
    bindingEventsOverTime: [],
    unBindingEventsOverTime: [],
};

export default LIVE_EVENTS_DEFAULT_STATE;
