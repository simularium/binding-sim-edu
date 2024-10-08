import {
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import classNames from "classnames";
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

export default function Viewer({ handleTimeChange }: ViewerProps): ReactNode {
    const [selectionStateInfo] = useState({
        highlightedAgents: [],
        hiddenAgents: [],
        appliedColors: [],
    });
    const [heightResized, setHeightResized] = useState(false);
    const container = useRef<HTMLDivElement>(null);
    const {
        viewportSize,
        setViewportSize,
        simulariumController,
        handleTrajectoryChange,
        trajectoryName,
        page,
        exampleTrajectoryPageNumber,
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

    // resize on container change
    useEffect(() => {
        setTimeout(() => {
            setViewportToContainerSize();
        }, 100);
    }, [setViewportToContainerSize, container.current?.offsetWidth]);

    useWindowResize(setViewportToContainerSize);
    useEffect(() => {
        if (page === exampleTrajectoryPageNumber && !heightResized) {
            setViewportToContainerSize();
            setHeightResized(true);
        }
    }, [
        page,
        setViewportToContainerSize,
        heightResized,
        exampleTrajectoryPageNumber,
    ]);

    if (!simulariumController) {
        return null;
    }

    return (
        <div
            className={classNames([styles.container], {
                [styles.example]: page === exampleTrajectoryPageNumber,
            })}
            key="viewer"
            ref={container}
        >
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
