import React, { useContext, useRef, useState } from "react";
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
import { MICRO } from "../../constants";

import plotStyles from "./plots.module.css";
import layoutStyles from "./events-over-time.module.css";
import ResizeContainer from "../shared/ResizeContainer";
import InfoText from "../shared/InfoText";
import { UiElement } from "../../types";

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

    // the two arrays will always be the same length
    // so this time calculation only needs to happen once
    const time = bindingEventsOverTime.map(
        (_, i) => (i * 10 * timeFactor) / 1000
    );

    const max = useRef<number>(0);
    const checkForNewMax = (array: number[]) => {
        const currentValue = array[array.length - 1];
        if (currentValue > max.current) {
            max.current = currentValue;
        }
    };
    checkForNewMax(bindingEventsOverTime);
    checkForNewMax(unbindingEventsOverTime);
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
     * Initially there is no data, and in that state, the axis
     * defaults to showing -1.5 to 1.5 and then the xaxis jumps down
     * when the data starts showing. To avoid this behavior, the yaxis
     * is given a hardcoded range until the real numbers arrive.
     */
    const xAxisRange = max.current > 0 ? ["auto", "auto"] : [0, 1];
    const yAxisRange = max.current > 0 ? [0, max.current] : [0, 20];
    /**
     * Regarding the bottom margin:
     * the plots need a bottom margin to display numbers. Only one of the
     * two plots has numbers along the axis, but if the margins are different,
     * the plots end up being different heights. So they are given the same margin,
     * defined here, and then the container moves the bottom plot up by the same value
     */
    const BOTTOM_MARGIN = 30;
    const layout = {
        ...BASE_PLOT_LAYOUT,
        height: 60,
        width: width,
        margin: { l: 10, r: BASE_PLOT_LAYOUT.margin.r, b: BOTTOM_MARGIN, t: 0 },
        xaxis: hideTickLabels,
        yaxis: {
            ...hideTickLabels,
            range: yAxisRange,
        },
    };

    return (
        <div className={plotStyles.plotContainer} style={{ marginBottom: 0 }}>
            <h3>
                Reaction events over time{" "}
                <InfoText uiElement={UiElement.EventsOverTimePlot} />
            </h3>
            <div className={plotStyles.yLabel}>Count of reactions</div>
            <ResizeContainer className={layoutStyles.plots} setWidth={setWidth}>
                <Flex vertical style={{ marginBottom: 10 }}>
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
                                hovertemplate: `%{y} binding events <br> at %{x} ${MICRO}s<extra></extra>`,
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
                                hovertemplate: `%{y} unbinding events <br> at %{x} ${MICRO}s<extra></extra>`,
                            },
                        ]}
                        layout={{
                            ...layout,
                            xaxis: {
                                ...AXIS_SETTINGS,
                                range: xAxisRange,
                                title: `time (${MICRO}s)`,
                                titlefont: {
                                    size: 12,
                                },
                            },
                        }}
                        config={CONFIG}
                    />
                </Flex>
            </ResizeContainer>
        </div>
    );
};

export default EventsOverTimePlot;
