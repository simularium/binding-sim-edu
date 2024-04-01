import { map } from "lodash";
import { PlotData } from "plotly.js";
import React, { useContext } from "react";
import Plot from "react-plotly.js";

import { BASE_PLOT_LAYOUT, PLOT_COLORS } from "./constants";
import { getColorIndex } from "./utils";
import { SimulariumContext } from "../../simulation/context";

interface PlotProps {
    data: { [key: string]: number[] };
}

const ProductConcentrationPlot: React.FC<PlotProps> = ({ data }) => {
    const { timeFactor } = useContext(SimulariumContext);
    const traces = map(
        data,
        (yValues: number[], id: string): Partial<PlotData> => {
            if (yValues.length <= 1) {
                // when the concentration is first changed it,
                // plays one frame to update, so there is one value
                // already but not necessarily data yet
                return {};
            }
            return {
                x: yValues.map((_, i) => (i * timeFactor) / 1000),
                y: yValues,
                type: "scatter" as const,
                mode: "lines" as const,
                name: id,
                line: { color: PLOT_COLORS[getColorIndex(id)] },
            };
        }
    );

    const layout = {
        ...BASE_PLOT_LAYOUT,
        title: "Concentration over Time",
        xaxis: { ...BASE_PLOT_LAYOUT.xaxis, title: "time (us)" },
        yaxis: { ...BASE_PLOT_LAYOUT.yaxis, title: "[AB]" },
    };

    return <Plot data={traces} layout={layout} />;
};

export default ProductConcentrationPlot;
