import { SimulariumController, TimeData } from "@aics/simularium-viewer";
import { createContext } from "react";
import { DEFAULT_VIEWPORT_SIZE } from "./trajectories-settings";

interface SimulariumContextType {
    isPlaying: boolean;
    setIsPlaying: (value: boolean) => void;
    simulariumController: SimulariumController | null;
    handleTimeChange: (timeData: TimeData) => void;
    setPage: (value: number) => void;
    page: number;
    timeFactor: number;
    viewportSize: { width: number; height: number };
    setViewportSize: (value: { width: number; height: number }) => void;
}

export const SimulariumContext = createContext({
    isPlaying: false,
    setIsPlaying: () => {},
    simulariumController: null,
    handleTimeChange: () => {},
    setPage: () => {},
    page: 0,
    timeFactor: 30,
    viewportSize: DEFAULT_VIEWPORT_SIZE,
    setViewportSize: () => {},
} as SimulariumContextType);
