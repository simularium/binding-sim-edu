import React, { useContext } from "react";
import Plot from "react-plotly.js";
import { BASE_PLOT_LAYOUT, PLOT_COLORS } from "./constants";
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
        title: "Equilibrium concentration",
        xaxis: {
            ...BASE_PLOT_LAYOUT.xaxis,
            title: "[B]microM",
            range: [0, maxConcentration],
        },
        yaxis: {
            ...BASE_PLOT_LAYOUT.yaxis,
            title: "[AB]microM",
            range: [0, maxConcentration],
        },
    };

    return <Plot data={trace} layout={layout} />;
};

export default EquilibriumPlot;
