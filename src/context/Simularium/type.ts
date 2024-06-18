import {
    SimulariumController,
    TimeData,
    TrajectoryFileInfo,
} from "@aics/simularium-viewer";
import { ProductName, AgentName } from "../../types";

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

export default SimulariumContextType;
