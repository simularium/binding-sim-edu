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

export interface SimulariumUiContextType {
    addCompletedModule: (value: Module) => void;
    completedModules: Set<Module>;
    module: Module;
    page: number;
    progressionElement: ProgressionElement | "";
    quizQuestion: string;
    resetAllState: () => void;
    section: Section;
    setModule: (value: Module) => void;
    setPage: (value: number) => void;
    setViewportType: () => void;
    viewportType: ViewType;
}

export interface SimulariumSimulationContextType {
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
    productName: ProductName;
    setIsPlaying: (value: boolean) => void;
    setViewportSize: (value: { width: number; height: number }) => void;
    simulariumController: SimulariumController | null;
    timeFactor: number;
    timeUnit: string;
    trajectoryName: string;
    viewportSize: { width: number; height: number };
}

export interface SimulariumAnalysisContextType {
    recordedConcentrations: number[];
    resetAnalysisState: () => void;
}

export const SimulariumUiContext = createContext<SimulariumUiContextType>({
    addCompletedModule: () => {},
    completedModules: new Set(),
    module: Module.A_B_AB,
    page: 0,
    progressionElement: "",
    quizQuestion: "",
    resetAllState: () => {},
    section: Section.Introduction,
    setModule: () => {},
    setPage: () => {},
    setViewportType: () => {},
    viewportType: ViewType.Lab,
});

export const SimulariumSimulationContext =
    createContext<SimulariumSimulationContextType>({
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
        productName: ProductName.AB,
        setIsPlaying: () => {},
        setViewportSize: () => {},
        simulariumController: null,
        timeFactor: 30,
        timeUnit: NANO,
        trajectoryName: LIVE_SIMULATION_NAME,
        viewportSize: DEFAULT_VIEWPORT_SIZE,
    });

export const SimulariumAnalysisContext =
    createContext<SimulariumAnalysisContextType>({
        recordedConcentrations: [],
        resetAnalysisState: () => {},
    });
