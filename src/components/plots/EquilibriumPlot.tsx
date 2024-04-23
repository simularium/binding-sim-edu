import React, { useContext } from "react";
import Plot from "react-plotly.js";
import { AXIS_SETTINGS, BASE_PLOT_LAYOUT, CONFIG, GRAY_COLOR, PLOT_COLORS } from "./constants";
import { getColorIndex } from "./utils";
import { SimulariumContext } from "../../simulation/context";

interface PlotProps {
    x: number[];
    y: number[];
}

const EquilibriumPlot: React.FC<PlotProps> = ({ x, y }) => {
    const { maxConcentration } = useContext(SimulariumContext);
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
            showticklabels: true,
            range: [0, maxConcentration],
        },
        yaxis: {
            ...AXIS_SETTINGS,
            title: "[AB]microM",
            showticklabels: true,
            range: [0, maxConcentration],
        },
    };

    return <Plot data={trace} layout={layout} config={CONFIG}/>;
};

export default EquilibriumPlot;
