import React from "react";
import Plot from "react-plotly.js";
import { BASE_PLOT_LAYOUT } from "./constants";

interface PlotProps {
    x: number[];
    y: number[];
}

const PLOT_COLORS = [
    "#a6cee3",
    "#b2df8a",
    "#33a02c",
    "#fb9a99",
    "#1f78b4",
    "#e31a1c",
    "#fdbf6f",
    "#ff7f00",
    "#cab2d6",
];
const EquilibriumPlot: React.FC<PlotProps> = ({ x, y }) => {
    const trace = [
        {
            x,
            y,
            type: "scatter" as const,
            mode: "markers" as const,
            name: "equilibrium",
            marker: { color: PLOT_COLORS.slice(0, x.length)},
        },
    ];

    const layout = {
        ...BASE_PLOT_LAYOUT,
        title: "Equilibrium concentration",
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
