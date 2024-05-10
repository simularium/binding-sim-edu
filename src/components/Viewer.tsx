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
    TimeData,
} from "@aics/simularium-viewer";
import "@aics/simularium-viewer/style/style.css";
import { SimulariumContext } from "../simulation/context";
import styles from "./viewer.module.css";
import useWindowResize from "../hooks/useWindowResize";
import { LIVE_SIMULATION_NAME } from "../constants";

interface ViewerProps {
    handleTimeChange: (timeData: TimeData) => void;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
}

export default function Viewer({
    handleTimeChange,
}: ViewerProps): ReactNode {
    const [selectionStateInfo] = useState({
        highlightedAgents: [],
        hiddenAgents: [],
        colorChange: null,
    });
    const [lockedCamera, setLockedCamera] = useState(true);
    const container = useRef<HTMLDivElement>(null);
    const { viewportSize, setViewportSize, simulariumController } = useContext(SimulariumContext);

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

    if (!simulariumController) {
        return null;
    }
    
    return (
        <div className={styles.container} key="viewer" ref={container}>
            <SimulariumViewer
                lockedCamera={lockedCamera}
                renderStyle={RenderStyle.WEBGL2_PREFERRED}
                height={viewportSize.height}
                width={viewportSize.width}
                loggerLevel=""
                onTimeChange={handleTimeChange}
                simulariumController={simulariumController}
                onJsonDataArrived={() => {}}
                showCameraControls={false}
                onTrajectoryFileInfoChanged={(trajectoryInfo) => {
                    if (trajectoryInfo.trajectoryTitle === LIVE_SIMULATION_NAME) {
                        // 2d trajectory
                        // lock camera and switch to orthographic camera
                        simulariumController.setCameraType(true);
                        setLockedCamera(true);
                    } else {
                        // 3d trajectory 
                        // allow camera to move and switch to perspective camera
                        simulariumController.setCameraType(false);
                        setLockedCamera(false);
                    }
                }}
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
