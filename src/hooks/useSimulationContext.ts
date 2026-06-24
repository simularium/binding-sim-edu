import { useContext } from "react";
import {
    SimulariumAnalysisContext,
    SimulariumAnalysisContextType,
    SimulariumSimulationContext,
    SimulariumSimulationContextType,
    SimulariumUiContext,
    SimulariumUiContextType,
} from "../simulation/context";

/**
 * Hook to access UI-related context (page, module, view type, etc.)
 */
export const useSimulariumUi = (): SimulariumUiContextType => {
    return useContext(SimulariumUiContext);
};

/**
 * Hook to access simulation-related context (playback, viewport, trajectory, etc.)
 */
export const useSimulariumSimulation = (): SimulariumSimulationContextType => {
    return useContext(SimulariumSimulationContext);
};

/**
 * Hook to access analysis-related context (recorded data, reset functions, etc.)
 */
export const useSimulariumAnalysis = (): SimulariumAnalysisContextType => {
    return useContext(SimulariumAnalysisContext);
};
