import React from "react";
import Plot from "react-plotly.js";
import { BASE_PLOT_LAYOUT, PLOT_COLORS } from "./constants";
import { getColorIndex } from "./utils";

interface PlotProps {
    x: number[];
    y: number[];
}

const EquilibriumPlot: React.FC<PlotProps> = ({ x, y }) => {
    const colors = x.map(
        (value) => PLOT_COLORS[getColorIndex((value))]
    );

    const trace = [
        {
            x,
            y,
            type: "scatter" as const,
            mode: "markers" as const,
            name: "equilibrium",
            marker: { color: colors },
        },
    ];

    const layout = {
        ...BASE_PLOT_LAYOUT,
        xaxis: {
            ...BASE_PLOT_LAYOUT.xaxis,
            title: "[B]microM",
            range: [0, 20],
        },
        yaxis: {
            ...BASE_PLOT_LAYOUT.yaxis,
            title: "[AB]microM",
            range: [0, 20],
        },
    };

    return <Plot data={trace} layout={layout} />;
};

export default EquilibriumPlot;
