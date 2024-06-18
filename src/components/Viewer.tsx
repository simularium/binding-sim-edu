import {
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import SimulariumViewer, { RenderStyle } from "@aics/simularium-viewer";
import "@aics/simularium-viewer/style/style.css";
import { SimulariumContext } from "../context";
import styles from "./viewer.module.css";
import useWindowResize from "../hooks/useWindowResize";
import { LIVE_SIMULATION_NAME } from "../constants";

export default function Viewer(): ReactNode {
    const [selectionStateInfo] = useState({
        highlightedAgents: [],
        hiddenAgents: [],
        colorChange: null,
    });
    const container = useRef<HTMLDivElement>(null);
    const {
        viewportSize,
        setViewportSize,
        simulariumController,
        handleTrajectoryChange,
        trajectoryName,
        handleTimeChange,
    } = useContext(SimulariumContext);

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
                lockedCamera={trajectoryName === LIVE_SIMULATION_NAME}
                disableCache={trajectoryName === LIVE_SIMULATION_NAME}
                renderStyle={RenderStyle.WEBGL2_PREFERRED}
                height={viewportSize.height}
                width={viewportSize.width}
                loggerLevel=""
                onTimeChange={handleTimeChange}
                simulariumController={simulariumController}
                onJsonDataArrived={() => {}}
                showCameraControls={false}
                onTrajectoryFileInfoChanged={handleTrajectoryChange}
                selectionStateInfo={selectionStateInfo}
                onUIDisplayDataChanged={() => {}}
                loadInitialData={true}
                showPaths={true}
                onError={console.log}
                backgroundColor={[0, 0, 0]}
                onRecordedMovie={() => {}}
            />
        </div>
    );
}
