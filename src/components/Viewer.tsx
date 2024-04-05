import { ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import SimulariumViewer, {
    RenderStyle,
    SimulariumController,
    TimeData,
} from "@aics/simularium-viewer";
import "@aics/simularium-viewer/style/style.css";
import { SimulariumContext } from "../simulation/context";

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
    const [selectionStateInfo] = useState({
        highlightedAgents: [],
        hiddenAgents: [],
        colorChange: null,
    });
    const container = useRef<HTMLDivElement>(null);
    const { viewportSize, setViewportSize } = useContext(SimulariumContext);

    const resize = useCallback((current: HTMLDivElement) => {
        const width = current.offsetWidth;
        const height = current.offsetHeight;
        setViewportSize({ height, width });
    }, [setViewportSize]);

    useEffect(() => {
        if (container.current) {
            resize(container.current);
        }
    }, [resize]);

    let resizeEvent: number | undefined;
    window.addEventListener("resize", () => {
        clearTimeout(resizeEvent);
        resizeEvent = setTimeout(() => {
            if (container.current) {
                resize(container.current);
            }
            // resizing resets the simulation so we don't
            // want to trigger this too often
            // unfortunately, browsers don't have an end resize event
        }, 2000);
    });

    return (
        <div
            className="viewer-container"
            key="viewer"
            ref={container}
        >
            <SimulariumViewer
                lockedCamera={true}
                renderStyle={RenderStyle.WEBGL2_PREFERRED}
                height={viewportSize.height}
                width={viewportSize.width}
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
