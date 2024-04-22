import React, { useContext, useEffect, useRef, useState } from "react";
import Plot from "react-plotly.js";
import { BASE_PLOT_LAYOUT, GRAY_COLOR } from "./constants";
import { SimulariumContext } from "../../simulation/context";
import styles from "./events-over-time.module.css";
import { Flex } from "antd";
import { A } from "../agent-symbols/A";
import { AB } from "../agent-symbols/AB";
import { B } from "../agent-symbols/B";

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
    const xAxisSettings = { range: [0, "auto"], showticklabels: false };
    const yAxisSettings = { range: [0, "auto"], showticklabels: false };
    // the two arrays will always be the same length
    // so this time calculation only needs to happen once
    const time = bindingEventsOverTime.map(
        (_, i) => (i * 10 * timeFactor) / 1000
    );

    return (
        <div className={styles.container}>
            <h3>Reaction events over time</h3>
            <div className={styles.yLabel}>Count of reactions</div>
            <Flex className={styles.plots} vertical gap={8} ref={containerRef}>
                <div>
                    {A}
                    <span> + </span>
                    {B}
                    <span> &#8594; </span>

                    {AB}
                </div>
                <Plot
                    data={[
                        {
                            x: time,
                            y: bindingEventsOverTime,
                            type: "bar" as const,
                            name: "bind events",
                            marker: { color: GRAY_COLOR },
                        },
                    ]}
                    layout={{
                        ...layout,
                        xaxis: { ...xAxisSettings },
                        yaxis: { ...yAxisSettings },
                    }}
                    config={{ displayModeBar: false }}
                />
                <div>
                    {AB}
                    <span> &#8594; </span>
                    {A}
                    <span> + </span>
                    {B}
                </div>
                <Plot
                    data={[
                        {
                            x: time,
                            y: unbindingEventsOverTime,
                            type: "bar" as const,
                            name: "unbind events",
                            marker: { color: GRAY_COLOR },
                        },
                    ]}
                    layout={{
                        ...layout,
                        xaxis: { ...xAxisSettings },
                        yaxis: { ...yAxisSettings },
                    }}
                    config={{ displayModeBar: false }}
                />
            </Flex>
        </div>
    );
};

export default EventsOverTimePlot;
