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
import styles from "./viewer.module.css";
import useWindowResize from "../hooks/useWindowResize";

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
    const [lockedCamera, setLockedCamera] = useState(true);
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

    useWindowResize(setViewportToContainerSize);
    return (
        <div className={styles.container} key="viewer" ref={container}>
            <SimulariumViewer
                lockedCamera={lockedCamera}
                renderStyle={RenderStyle.WEBGL2_PREFERRED}
                height={viewportSize.height}
                width={viewportSize.width}
                loggerLevel=""
                onTimeChange={handleTimeChange}
                simulariumController={controller}
                onJsonDataArrived={() => {}}
                showCameraControls={false}
                onTrajectoryFileInfoChanged={(info) => {
                    if (info.trajectoryTitle) {
                        // is a pre-rendered trajectory
                        // we want to use the perspective camera 
                        // and allow the user to move the camera
                        controller.setCameraType(false);
                        setLockedCamera(false);
                    } else {
                        // local 2D simulation
                        controller.setCameraType(true);
                        setLockedCamera(true);
                    }
                }}
                selectionStateInfo={selectionStateInfo}
                onUIDisplayDataChanged={(data) => {
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
