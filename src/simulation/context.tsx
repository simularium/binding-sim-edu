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
    maxConcentration: number;
    module: Module;
    moduleLength: number;
    setModule: (value: Module) => void;
    getAgentColor: (agentName: AgentName) => string;
    currentProductionConcentration: number;
    isPlaying: boolean;
    setIsPlaying: (value: boolean) => void;
    simulariumController: SimulariumController | null;
    handleTimeChange: (timeData: TimeData) => void;
    handleStartExperiment: () => void;
    section: Section;
    setPage: (value: number) => void;
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
    productName: ProductName.AB,
    module: Module.A_B_AB,
    setModule: () => {},
    moduleLength: 0,
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
    timeFactor: 30,
    timeUnit: NANO,
    handleTrajectoryChange: () => {},
    viewportSize: DEFAULT_VIEWPORT_SIZE,
    setViewportSize: () => {},
    recordedConcentrations: [],
} as SimulariumContextType);
