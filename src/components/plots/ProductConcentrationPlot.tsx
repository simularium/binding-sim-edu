import { PlotData } from "plotly.js";
import React, { useContext } from "react";
import Plot from "react-plotly.js";

import { AXIS_SETTINGS, BASE_PLOT_LAYOUT, CONFIG, PLOT_COLORS } from "./constants";
import { getColorIndex } from "./utils";
import { ProductOverTimeTrace } from "./types";
import { SimulariumContext } from "../../simulation/context";

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
            title: "time (us)",
            showticklabels: true,
            range: [0, "auto"],
        },
        yaxis: {
            ...AXIS_SETTINGS,
            title: "[AB]",
            range: [0, "auto"],
            showticklabels: true,
        },
    };

    return <Plot data={traces} layout={layout} config={CONFIG} />;
};

export default ProductConcentrationPlot;
