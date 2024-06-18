import {
    DEFAULT_VIEWPORT_SIZE,
    LIVE_SIMULATION_NAME,
    NANO,
} from "../../constants";
import LiveSimulationData from "../../simulation/LiveSimulationData";
import { ProductName } from "../../types";

const DEFAULT_SIMULARIUM_STATE = {
    simulariumController: null,
    handleTrajectoryChange: () => {},
    trajectoryName: LIVE_SIMULATION_NAME,
    productName: ProductName.AB,
    maxConcentration: 10,
    viewportSize: DEFAULT_VIEWPORT_SIZE,
    isPlaying: false,
    timeFactor: LiveSimulationData.DEFAULT_TIME_FACTOR,
    timeUnit: NANO,
};

export default DEFAULT_SIMULARIUM_STATE;
