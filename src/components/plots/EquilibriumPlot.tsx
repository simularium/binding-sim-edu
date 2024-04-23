import React from "react";
import Plot from "react-plotly.js";
import { AXIS_SETTINGS, BASE_PLOT_LAYOUT, CONFIG, GRAY_COLOR, PLOT_COLORS } from "./constants";
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
            x: [0, 20],
            y: [5, 5],
            mode: "lines",
            line: {
                color: GRAY_COLOR,
                dash: "dot",
            },
        },
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
        showlegend: false,
        height: 130,
        xaxis: {
            ...AXIS_SETTINGS,
            title: "[B]microM",
            range: [0, 20],
            showticklabels: true,
        },
        yaxis: {
            ...AXIS_SETTINGS,
            title: "[AB]microM",
            range: [0, 10],
            showticklabels: true,
        },
    };

    return <Plot data={trace} layout={layout} config={CONFIG}/>;
};

export default EquilibriumPlot;
