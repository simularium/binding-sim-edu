/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
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

    const resize = (current: HTMLDivElement) => {
        const width = current.offsetWidth;
        const height = current.offsetHeight;
        setViewportSize({ height, width });
    };

    useEffect(() => {
        if (container.current) {
            resize(container.current);
        }
    }, []);

    let resizeEvent: number | undefined;
    window.addEventListener("resize", () => {

        clearTimeout(resizeEvent);
        resizeEvent = setTimeout(() => {
            if (container.current) {
                resize(container.current);
            }
        }, 2000)
    });

    return (
        <div className="viewer-container" key="viewer" ref={container}>
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
