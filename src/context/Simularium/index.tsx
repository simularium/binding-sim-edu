import { createContext } from "react";

import SimulariumContextType from "./type";
import DEFAULT_SIMULARIUM_STATE from "./default";

const SimulariumContext = createContext({
    ...DEFAULT_SIMULARIUM_STATE,
    handleTrajectoryChange: () => {},
    setIsPlaying: () => {},
    handleTimeChange: () => {},
    getAgentColor: () => "",
    setViewportSize: () => {},
} as SimulariumContextType);

export default SimulariumContext;
