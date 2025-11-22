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
    ProgressionElement,
} from "../constants";
import { AgentName, Module, ProductName, Section, ViewType } from "../types";

interface SimulariumContextType {
    adjustableAgentName: AgentName;
    currentProductionConcentration: number;
    fixedAgentStartingConcentration: number;
    getAgentColor: (agentName: AgentName | ProductName) => string;
    handleMixAgents: () => void;
    handleStartExperiment: () => void;
    handleTimeChange: (timeData: TimeData) => void;
    handleTrajectoryChange: (value: TrajectoryFileInfo) => void;
    isPlaying: boolean;
    maxConcentration: number;
    module: Module;
    page: number;
    productName: ProductName;
    progressionElement: ProgressionElement | "";
    quizQuestion: string;
    recordedConcentrations: number[];
    section: Section;
    setIsPlaying: (value: boolean) => void;
    setModule: (value: Module) => void;
    setPage: (value: number) => void;
    setViewportSize: (value: { width: number; height: number }) => void;
    setViewportType: () => void;
    simulariumController: SimulariumController | null;
    timeFactor: number;
    timeUnit: string;
    trajectoryName: string;
    viewportSize: { width: number; height: number };
    viewportType: ViewType;
    addCompletedModule: (value: Module) => void;
    completedModules: Set<Module>;
}

export const SimulariumContext = createContext({
    adjustableAgentName: AgentName.B,
    currentProductionConcentration: 0,
    fixedAgentStartingConcentration: 0,
    getAgentColor: () => "",
    handleMixAgents: () => {},
    handleStartExperiment: () => {},
    handleTimeChange: () => {},
    handleTrajectoryChange: () => {},
    isPlaying: false,
    maxConcentration: 10,
    module: Module.A_B_AB,
    page: 0,
    productName: ProductName.AB,
    progressionElement: "",
    quizQuestion: "",
    recordedConcentrations: [],
    section: Section.Introduction,
    setIsPlaying: () => {},
    setModule: () => {},
    setPage: () => {},
    setViewportSize: () => {},
    setViewportType: () => {},
    simulariumController: null,
    timeFactor: 30,
    timeUnit: NANO,
    trajectoryName: LIVE_SIMULATION_NAME,
    viewportSize: DEFAULT_VIEWPORT_SIZE,
    viewportType: ViewType.Lab,
    addCompletedModule: () => {},
    completedModules: new Set(),
} as SimulariumContextType);
