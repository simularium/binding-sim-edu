import { PlotData } from "plotly.js";
import React, { useContext, useRef } from "react";
import Plot from "react-plotly.js";

import {
    AXIS_SETTINGS,
    BASE_PLOT_LAYOUT,
    CONFIG,
    PLOT_COLORS,
} from "./constants";
import { ProductOverTimeTrace } from "./types";
import { SimulariumContext } from "../../simulation/context";
import { AGENT_AB_COLOR } from "../../constants/colors";
import { MICRO } from "../../constants";

import plotStyles from "./plots.module.css";
import { getColorIndex, indexToTime } from "../../utils";

interface ProductConcentrationPlotProps {
    data: ProductOverTimeTrace[];
    width: number;
    height: number;
    colors: string[];
    dotsX: number[];
    dotsY: number[];
}

const ProductConcentrationPlot: React.FC<ProductConcentrationPlotProps> = ({
    data,
    width,
    height,
    colors,
    dotsX = [],
    dotsY = [],
}) => {
    const { timeFactor, productName, timeUnit, maxConcentration } =
        useContext(SimulariumContext);
    const hasData = useRef(false);
    if (data.length === 0) {
        hasData.current = false;
    }
    const traces = data.map((trace): Partial<PlotData> => {
        const { inputConcentration, productConcentrations } = trace;
        if (!productConcentrations) {
            return {};
        }
        if (productConcentrations.length <= 1) {
            // when the concentration is first changed it,
            // plays one frame to update, so there is one value
            // already but not necessarily data yet
            return {};
        }

        /**
         * When there is just a single plot, we need to
         * find the point where the data is first greater than 0
         * to set the range of the plot axis to "auto"
         */
        if (data.length === 1 && !hasData.current) {
            const lastValue =
                productConcentrations[productConcentrations.length - 1];
            hasData.current = lastValue > 0;
        }

        const timeArray = productConcentrations.map((_, i) =>
            indexToTime(i, timeFactor, timeUnit)
        );
        return {
            x: timeArray,
            y: productConcentrations,
            type: "scatter" as const,
            mode: "lines" as const,
            name: inputConcentration.toString(),
            line: {
                color: PLOT_COLORS[
                    getColorIndex(inputConcentration, maxConcentration)
                ],
                width: 1,
            },
            hovertemplate:
                "time: <b>%{x:.1f}</b><br>" +
                "[AB]: <b>%{y:.1f}</b><br>" +
                "Initial [B]: </b>" +
                `<b>${inputConcentration.toString()} </b>` +
                "<extra></extra>",
        };
    });

    if (dotsX.length > 0) {
        traces.push({
            x: dotsX,
            y: dotsY,
            name: "",
            type: "scatter" as const,
            mode: "markers" as const,
            marker: {
                color: colors,
                size: 8,
            },
        });
    }
    /**
     * When there is no data, we want to show the axis at 0, 0, but plotly
     * defaults to -1.5 to 1.5 with no data, even when the range is set to
     * [0,  "auto"]
     */
    const range = hasData.current ? [0, "auto"] : [0, 1];
    const layout = {
        ...BASE_PLOT_LAYOUT,
        width: width,
        height: Math.max(130, height),
        xaxis: {
            ...AXIS_SETTINGS,
            range: range,
            rangemode: "tozero" as const,
            title: `time (${MICRO}s)`,
        },
        yaxis: {
            ...AXIS_SETTINGS,
            range: range,
            title: `[${productName}] ${MICRO}M`,
            rangemode: "tozero" as const,
            titlefont: {
                ...AXIS_SETTINGS.titlefont,
                color: AGENT_AB_COLOR,
            },
        },
    };
    return (
        <div className={plotStyles.plotContainer}>
            <Plot data={traces} layout={layout} config={CONFIG} />
        </div>
    );
};

export default ProductConcentrationPlot;
