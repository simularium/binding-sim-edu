import { SimulariumController } from "@aics/simularium-viewer";
import { createContext } from "react";

interface SimulariumContextType {
    isPlaying: boolean;
    setIsPlaying: (value: boolean) => void;
    simulariumController: SimulariumController | null;
    handleTimeChange: () => void;
}
export const SimulariumContext = createContext({
    isPlaying: false,
    setIsPlaying: () => {},
    simulariumController: null,
    handleTimeChange: () => {},
} as SimulariumContextType);
