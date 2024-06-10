import {
    SimulariumController,
    TimeData,
    TrajectoryFileInfo,
} from "@aics/simularium-viewer";
import { createContext } from "react";
import {
    DEFAULT_VIEWPORT_SIZE,
    LIVE_SIMULATION_NAME,
    NANO,
} from "../constants";
import { AgentName, CurrentConcentration, Module, ProductName } from "../types";

interface SimulariumContextType {
    trajectoryName: string;
    productName: ProductName;
    maxConcentration: number;
    getAgentColor: (agentName: AgentName) => string;
    isPlaying: boolean;
    setIsPlaying: (value: boolean) => void;
    simulariumController: SimulariumController | null;
    handleTimeChange: (timeData: TimeData) => void;
    timeFactor: number;
    timeUnit: string;
    handleTrajectoryChange: (value: TrajectoryFileInfo) => void;
    viewportSize: { width: number; height: number };
    setViewportSize: (value: { width: number; height: number }) => void;
}

interface AppContextType {
    setPage: (value: number) => void;
    page: number;
    currentModule: Module;
}

export const AppContext = createContext({
    setPage: () => {},
    page: 0,
    currentModule: Module.A_B_AB,
} as AppContextType);

export const SimulariumContext = createContext({
    simulariumController: null,
    handleTrajectoryChange: () => {},
    trajectoryName: LIVE_SIMULATION_NAME,
    productName: ProductName.AB,
    maxConcentration: 10,
    viewportSize: DEFAULT_VIEWPORT_SIZE,
    isPlaying: false,
    setIsPlaying: () => {},
    handleTimeChange: () => {},
    timeFactor: 30,
    timeUnit: NANO,
    getAgentColor: () => "",
    setViewportSize: () => {},
} as SimulariumContextType);

interface AnalysisContextType {
    recordedConcentrations: number[];
    currentProductionConcentration: number;
}

export const AnalysisContext = createContext({
    recordedConcentrations: [],
    currentProductionConcentration: 0,
} as AnalysisContextType);

interface LiveEventsContextType {
    liveConcentration: CurrentConcentration;
    handleNewInputConcentration: (name: string, value: number) => void;
    handleFinishInputConcentrationChange: (name: string, value: number) => void;
    bindingEventsOverTime: number[];
    unbindingEventsOverTime: number[];
}
export const LiveEventsContext = createContext({
    liveConcentration: {},
    handleNewInputConcentration: () => {},
    handleFinishInputConcentrationChange: () => {},
    bindingEventsOverTime: [],
    unbindingEventsOverTime: [],
} as LiveEventsContextType);
