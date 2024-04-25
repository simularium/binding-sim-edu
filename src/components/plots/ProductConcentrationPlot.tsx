import { PlotData } from "plotly.js";
import React, { useContext } from "react";
import Plot from "react-plotly.js";

import {
    AXIS_SETTINGS,
    BASE_PLOT_LAYOUT,
    CONFIG,
    PLOT_COLORS,
} from "./constants";
import { getColorIndex } from "./utils";
import { ProductOverTimeTrace } from "./types";
import { SimulariumContext } from "../../simulation/context";
import { MICRO } from "../../constants";
import plotStyles from "./plots.module.css";
import { AGENT_AB_COLOR } from "../../constants/colors";

interface ProductConcentrationPlotProps {
    data: ProductOverTimeTrace[];
}

const ProductConcentrationPlot: React.FC<ProductConcentrationPlotProps> = ({
    data,
}) => {
    const { timeFactor } = useContext(SimulariumContext);
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
        return {
            x: productConcentrations.map((_, i) => (i * timeFactor) / 1000),
            y: productConcentrations,
            type: "scatter" as const,
            mode: "lines" as const,
            name: inputConcentration.toString(),
            line: { color: PLOT_COLORS[getColorIndex(inputConcentration)] },
        };
    });

    const layout = {
        ...BASE_PLOT_LAYOUT,
        height: 130,
        xaxis: {
            ...AXIS_SETTINGS,
            title: `time (${MICRO}s)`,
            showticklabels: true,
            range: [0, "auto"],
            titlefont: {
                size: 12,
            },
        },
        yaxis: {
            ...AXIS_SETTINGS,
            range: [0, "auto"],
            showticklabels: true,
            title: `[AB] ${MICRO}M`,
            titlefont: {
                size: 12,
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
