/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, useEffect, useRef, useState } from "react";
import SimulariumViewer, {
    RenderStyle,
    SimulariumController,
    TimeData,
} from "@aics/simularium-viewer";
import "@aics/simularium-viewer/style/style.css";

interface ViewerProps {
    controller: SimulariumController;
    handleTimeChange: (timeData: TimeData) => void;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
}

export default function Viewer({
    controller,
    handleTimeChange,
}: ViewerProps): ReactNode {
    const [size, setSize] = useState({ width: 500, height: 500 });
    const [selectionStateInfo] = useState({
        highlightedAgents: [],
        hiddenAgents: [],
        colorChange: null,
    });
    const container = useRef<HTMLDivElement>(null);

    const resize = (current: HTMLDivElement) => {
        const width = current.offsetWidth;
        const height = current.offsetHeight;
        setSize({ height, width });
    }

    useEffect(() => { 
        if (container.current) {
        resize(container.current);
    } }, [])

    window.addEventListener("resize", () => {
        if (container.current) {
            resize(container.current);
        }
    });
    

    return (
        <div className="viewer-container" key="viewer" ref={container}>
            <SimulariumViewer
                lockedCamera={true}
                renderStyle={RenderStyle.WEBGL2_PREFERRED}
                height={size.height}
                width={size.width}
                loggerLevel=""
                onTimeChange={handleTimeChange}
                simulariumController={controller}
                onJsonDataArrived={() => {}}
                showCameraControls={false}
                onTrajectoryFileInfoChanged={() => {}}
                selectionStateInfo={selectionStateInfo}
                onUIDisplayDataChanged={() => {
                    return undefined;
                }}
                loadInitialData={true}
                showPaths={true}
                onError={console.log}
                backgroundColor={[0, 0, 0]}
                onRecordedMovie={() => {}}
            />
        </div>
    );
}
