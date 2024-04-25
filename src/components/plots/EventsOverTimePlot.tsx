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
    const [max, setMax] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // the two arrays will always be the same length
    // so this time calculation only needs to happen once
    const time = bindingEventsOverTime.map(
        (_, i) => (i * 10 * timeFactor) / 1000
    );

    useEffect(() => {
        setWidth(containerRef.current?.offsetWidth || 0);
    }, [containerRef.current?.offsetWidth, width]);

    const checkForNewMax = (array: number[]) => {
        const currentValue = array[array.length - 1];
        if (currentValue > 0) {
            setMax(currentValue);
        }
    };
    checkForNewMax(bindingEventsOverTime);
    checkForNewMax(bindingEventsOverTime);

    const hideTickLabels = {
        ...AXIS_SETTINGS,
        showticklabels: false,
    };

    const plotSettings = {
        type: "bar" as const,
        name: "unbind events",
        marker: { color: AXIS_COLOR },
        x: time,
    };

    /**
     * Initially there is no data, and in that state, the yaxis
     * defaults to showing -1.5 to 1.5 and then the xaxis jumps down
     * when the data starts showing. To avoid this behavior, the yaxis
     * is given a hardcoded range until the real numbers arrive.
     * Using max here keeps the two plots on the same y axis scale
     */
    const yAxisRange = max > 0 ? [0, max] : [0, 20];
    /**
     * the plots need a bottom margin to display numbers. But only one of the
     * two plots has number, but if the margins are different, the plots
     * end up being different heights. So they get the same margin, and then
     * the container moves the bottom plot up by the same amount
     */
    const BOTTOM_MARGIN = 30;
    const layout = {
        ...BASE_PLOT_LAYOUT,
        height: 60,
        width: width,
        margin: { l: 10, r: 25.5, b: BOTTOM_MARGIN, t: 0 },
        xaxis: hideTickLabels,
        yaxis: {
            ...hideTickLabels,
            range: yAxisRange,
        },
    };

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
                <Flex vertical>
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
                                ...plotSettings,
                                y: bindingEventsOverTime,
                            },
                        ]}
                        layout={layout}
                        config={CONFIG}
                    />
                </Flex>
                <Flex vertical style={{ marginTop: -BOTTOM_MARGIN }}>
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
                                ...plotSettings,
                                y: unbindingEventsOverTime,
                            },
                        ]}
                        layout={{
                            ...layout,
                            xaxis: {
                                ...AXIS_SETTINGS,
                                title: `time (${MICRO}s)`,
                                titlefont: {
                                    size: 12,
                                },
                            },
                        }}
                        config={CONFIG}
                    />
                </Flex>
            </Flex>
        </div>
    );
};

export default EventsOverTimePlot;
