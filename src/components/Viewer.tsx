import React, { ReactNode, useState } from "react";
import SimulariumViewer, {
    RenderStyle,
    SimulariumController,
} from "@aics/simularium-viewer";
import "@aics/simularium-viewer/style/style.css";
export default function Viewer({ controller }: { controller: SimulariumController }): ReactNode {
    const agentColors = [
        "#fee34d",
        "#f7b232",
        "#bf5736",
        "#94a7fc",
        "#ce8ec9",
        "#58606c",
        "#0ba345",
        "#9267cb",
        "#81dbe6",
        "#bd7800",
        "#bbbb99",
        "#5b79f0",
        "#89a500",
        "#da8692",
        "#418463",
        "#9f516c",
        "#00aabf",
    ];
    const viewerRef = React.createRef<HTMLDivElement>();
    const [size, setSize] = useState({ width: 500, height: 500 });
    const [selectionStateInfo, setSelectionStateInfo] = useState({
        highlightedAgents: [],
        hiddenAgents: [],
        colorChange: null,
    });
    const handleTimeChange = () => {
        // console.log("time changed", timeData);
    };
    

    return (
        <div className="viewer-container" ref={viewerRef}>
            <SimulariumViewer
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
                onUIDisplayDataChanged={console.log}
                loadInitialData={true}
                agentColors={agentColors}
                showPaths={true}
                onError={console.log}
                backgroundColor={[0, 0, 0]}
            />
        </div>
    );
}
