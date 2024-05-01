import { SimulariumController, TimeData } from "@aics/simularium-viewer";
import { createContext } from "react";
import { DEFAULT_VIEWPORT_SIZE, getMaxConcentration } from "./trajectories-settings";
import { ReactionType } from "../constants";

interface SimulariumContextType {
    maxConcentration: number;
    currentProductionConcentration: number;
    isPlaying: boolean;
    setIsPlaying: (value: boolean) => void;
    simulariumController: SimulariumController | null;
    handleTimeChange: (timeData: TimeData) => void;
    setPage: (value: number) => void;
    page: number;
    timeFactor: number;
    viewportSize: { width: number; height: number };
    setViewportSize: (value: { width: number; height: number }) => void;
    recordedConcentrations: number[];
}

export const SimulariumContext = createContext({
    maxConcentration: getMaxConcentration(ReactionType.A_B_AB),
    currentProductionConcentration: 0,
    isPlaying: false,
    setIsPlaying: () => {},
    simulariumController: null,
    handleTimeChange: () => {},
    setPage: () => {},
    page: 0,
    timeFactor: 30,
    viewportSize: DEFAULT_VIEWPORT_SIZE,
    setViewportSize: () => {},
    recordedConcentrations: [],
} as SimulariumContextType);
