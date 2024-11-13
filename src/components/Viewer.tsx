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
    const [userHasInteracted, setUserHasInteracted] = useState(false);
    const [firstMousePosition, setFirstMousePosition] = useState({
        x: 0,
        y: 0,
    });
    const container = useRef<HTMLDivElement>(null);
    const {
        viewportSize,
        setViewportSize,
        simulariumController,
        handleTrajectoryChange,
        trajectoryName,
        page,
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

    const is3DTrajectory = trajectoryName !== LIVE_SIMULATION_NAME;

    useEffect(() => {
        if (is3DTrajectory && !heightResized) {
            setViewportToContainerSize();
            setHeightResized(true);
        }
    }, [page, setViewportToContainerSize, heightResized, is3DTrajectory]);

    useEffect(() => {
        if (!is3DTrajectory) {
            return;
        }
        const el = container.current;
        if (!el) {
            return;
        }
        const handleMouseDown = (event: MouseEvent) => {
            if (!userHasInteracted) {
                setFirstMousePosition({
                    x: event.clientX,
                    y: event.clientY,
                });
            }
        };
        const handleMouseUp = (event: MouseEvent) => {
            if (
                firstMousePosition.x !== event.clientX &&
                firstMousePosition.y !== event.clientY
            ) {
                setUserHasInteracted(true);
            }
        };

        const handleWheel = () => setUserHasInteracted(true);

        if (!userHasInteracted) {
            el.addEventListener("mousedown", handleMouseDown);
            el.addEventListener("mouseup", handleMouseUp);
            el.addEventListener("wheel", handleWheel);
        }
        return () => {
            el.removeEventListener("mousedown", handleMouseDown);
            el.removeEventListener("mouseup", handleMouseUp);
            el.removeEventListener("wheel", handleWheel);
        };
    }, [is3DTrajectory, userHasInteracted, firstMousePosition]);

    if (!simulariumController) {
        return null;
    }

    const hintOverlay = (
        <div className={styles.hintOverlay}>
            Play, scroll or click + drag to interact
        </div>
    );

    const showHintOverlay = !userHasInteracted && is3DTrajectory;
    return (
        <div
            className={classNames([styles.container], {
                [styles.example]: is3DTrajectory,
            })}
            key="viewer"
            ref={container}
        >
            {showHintOverlay && hintOverlay}
            <SimulariumViewer
                // lockedCamera={trajectoryName === LIVE_SIMULATION_NAME}
                disableCache={trajectoryName === LIVE_SIMULATION_NAME}
                renderStyle={RenderStyle.WEBGL2_PREFERRED}
                height={viewportSize.height}
                width={viewportSize.width}
                loggerLevel=""
                onTimeChange={handleTimeChange}
                simulariumController={simulariumController}
                onJsonDataArrived={() => {}}
                showCameraControls={false}
                showBounds={false}
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
