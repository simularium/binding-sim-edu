import React, { useContext, useEffect, useRef, useState } from "react";
import { Flex } from "antd";
import Plot from "react-plotly.js";

import {
    AXIS_COLOR,
    AXIS_SETTINGS,
    BASE_PLOT_LAYOUT,
    CONFIG,
} from "./constants";
import { SimulariumContext } from "../../simulation/context";
import { A, B, AB } from "../agent-symbols";

import plotStyles from "./plots.module.css";
import layoutStyles from "./events-over-time.module.css";
import { MICRO } from "../../constants";

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
        height: 60,
        width: width,
        margin: { l: 0, r: 25.5, b: 18, t: 0 },
    };

    // the two arrays will always be the same length
    // so this time calculation only needs to happen once
    const time = bindingEventsOverTime.map(
        (_, i) => (i * 10 * timeFactor) / 1000
    );

    return (
        <div className={plotStyles.plotContainer}>
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
                        xaxis: { ...AXIS_SETTINGS },
                        yaxis: { ...AXIS_SETTINGS },
                    }}
                    config={CONFIG}
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
                        margin: {
                            ...layout.margin,
                            b: 18,
                        },
                        xaxis: {
                            ...AXIS_SETTINGS,
                            title: `time (${MICRO}s)`,
                            titlefont: {
                                size: 12,
                            },
                        },
                        yaxis: { ...AXIS_SETTINGS },
                    }}
                    config={CONFIG}
                />
            </Flex>
        </div>
    );
};

export default EventsOverTimePlot;
