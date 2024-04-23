import React, { useContext, useEffect, useRef, useState } from "react";
import { Flex } from "antd";
import Plot from "react-plotly.js";

import {
    AXIS_COLOR,
    BASE_PLOT_LAYOUT,
    PLOT_BACKGROUND_COLOR,
} from "./constants";
import { SimulariumContext } from "../../simulation/context";
import { A, B, AB } from "../agent-symbols";

import plotStyles from "./plots.module.css";
import layoutStyles from "./events-over-time.module.css";

interface PlotProps {
    bindingEventsOverTime: number[];
    unbindingEventsOverTime: number[];
}

const EventsOverTimePlot: React.FC<PlotProps> = ({
    bindingEventsOverTime,
    unbindingEventsOverTime,
}) => {
    const { timeFactor } = useContext(SimulariumContext);
    const [width, setWidth] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setWidth(containerRef.current?.offsetWidth || 0);
    }, [containerRef.current?.offsetWidth, width]);

    const layout = {
        ...BASE_PLOT_LAYOUT,
        height: 40,
        width: width,
        margin: { l: 0, r: 25.5, b: 0, t: 0 },
    };

    const axisSettings = {
        range: [0, "auto"],
        gridcolor: PLOT_BACKGROUND_COLOR,
        showticklabels: false,
        color: AXIS_COLOR,
        fixedrange: true,
        showline: true,
    };
    // the two arrays will always be the same length
    // so this time calculation only needs to happen once
    const time = bindingEventsOverTime.map(
        (_, i) => (i * 10 * timeFactor) / 1000
    );

    return (
        <div className={layoutStyles.container}>
            <h3>Reaction events over time</h3>
            <div className={plotStyles.yLabel}>Count of reactions</div>
            <Flex
                className={layoutStyles.plots}
                vertical
                gap={8}
                ref={containerRef}
            >
                <div>
                    <A />
                    <span> + </span>
                    <B />
                    <span> &#8594; </span>
                    <AB />
                </div>
                <Plot
                    data={[
                        {
                            x: time,
                            y: bindingEventsOverTime,
                            type: "bar" as const,
                            name: "bind events",
                            marker: { color: AXIS_COLOR },
                        },
                    ]}
                    layout={{
                        ...layout,
                        xaxis: { ...axisSettings },
                        yaxis: { ...axisSettings },
                    }}
                    config={{ displayModeBar: false }}
                />
                <div>
                    <AB />
                    <span> &#8594; </span>
                    <A />
                    <span> + </span>
                    <B />
                </div>
                <Plot
                    data={[
                        {
                            x: time,
                            y: unbindingEventsOverTime,
                            type: "bar" as const,
                            name: "unbind events",
                            marker: { color: AXIS_COLOR },
                        },
                    ]}
                    layout={{
                        ...layout,
                        xaxis: { ...axisSettings },
                        yaxis: { ...axisSettings },
                    }}
                    config={{ displayModeBar: false }}
                />
            </Flex>
        </div>
    );
};

export default EventsOverTimePlot;
