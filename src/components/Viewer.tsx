import {
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
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

    const setViewportToContainerSize = useCallback(() => {
        if (container.current) {
            const width = container.current.offsetWidth;
            const height = container.current.offsetHeight;
            setViewportSize({ height, width });
        }
    }, [setViewportSize]);

    // resize on mount
    useEffect(() => {
        setViewportToContainerSize();
    }, [setViewportToContainerSize]);

    const resizeEvent = useRef<number | undefined>(undefined);
    window.addEventListener("resize", () => {
        clearTimeout(resizeEvent.current);
        // resizing resets the simulation so we don't
        // want to trigger this too often
        resizeEvent.current = setTimeout(() => {
            clearTimeout(resizeEvent.current);
            setViewportToContainerSize()
        }, 200);
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
