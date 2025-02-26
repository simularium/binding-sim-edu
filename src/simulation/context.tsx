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
import { AgentName, Module, ProductName, Section } from "../types";

interface SimulariumContextType {
    trajectoryName: string;
    productName: ProductName;
    adjustableAgentName: AgentName;
    fixedAgentStartingConcentration: number;
    maxConcentration: number;
    getAgentColor: (agentName: AgentName | ProductName) => string;
    currentProductionConcentration: number;
    isPlaying: boolean;
    setIsPlaying: (value: boolean) => void;
    simulariumController: SimulariumController | null;
    handleTimeChange: (timeData: TimeData) => void;
    handleStartExperiment: () => void;
    section: Section;
    setPage: (value: number) => void;
    module: Module;
    setModule: (value: Module) => void;
    moduleLength: number;
    page: number;
    timeFactor: number;
    timeUnit: string;
    handleTrajectoryChange: (value: TrajectoryFileInfo) => void;
    viewportSize: { width: number; height: number };
    setViewportSize: (value: { width: number; height: number }) => void;
    recordedConcentrations: number[];
}

export const SimulariumContext = createContext({
    trajectoryName: LIVE_SIMULATION_NAME,
    adjustableAgentName: AgentName.B,
    productName: ProductName.AB,
    fixedAgentStartingConcentration: 0,
    maxConcentration: 10,
    getAgentColor: () => "",
    currentProductionConcentration: 0,
    section: Section.Introduction,
    isPlaying: false,
    setIsPlaying: () => {},
    simulariumController: null,
    handleTimeChange: () => {},
    handleStartExperiment: () => {},
    setPage: () => {},
    page: 0,
    setModule: () => {},
    module: Module.A_B_AB,
    moduleLength: 0,
    timeFactor: 30,
    timeUnit: NANO,
    handleTrajectoryChange: () => {},
    viewportSize: DEFAULT_VIEWPORT_SIZE,
    setViewportSize: () => {},
    recordedConcentrations: [],
} as SimulariumContextType);
