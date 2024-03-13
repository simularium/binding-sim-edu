import { SimulariumController } from "@aics/simularium-viewer";
import { createContext } from "react";

interface SimulariumContextType {
    isPlaying: boolean;
    setIsPlaying: (value: boolean) => void;
    simulariumController: SimulariumController | null;
    handleTimeChange: () => void;
    setPage: (value: number) => void;
    page: number;
}
export const SimulariumContext = createContext({
    isPlaying: false,
    setIsPlaying: () => {},
    simulariumController: null,
    handleTimeChange: () => {},
    setPage: () => {},
    page: 0
} as SimulariumContextType);
