import React, { useContext } from "react";
import Plot from "react-plotly.js";

import {
    AXIS_SETTINGS,
    BASE_PLOT_LAYOUT,
    CONFIG,
    GRAY_COLOR,
    PLOT_COLORS,
} from "./constants";
import { getColorIndex } from "./utils";
import { SimulariumContext } from "../../simulation/context";
import { AGENT_AB_COLOR, AGENT_B_COLOR } from "../../constants/colors";
import { MICRO } from "../../constants";

import plotStyles from "./plots.module.css";
import { Dash } from "plotly.js";

interface PlotProps {
    x: number[];
    y: number[];
}

const EquilibriumPlot: React.FC<PlotProps> = ({ x, y }) => {
    const { maxConcentration } = useContext(SimulariumContext);
    const colors = x.map((value) => PLOT_COLORS[getColorIndex(value)]);
    const horizontalDottedLine = {
        x: [0, maxConcentration],
        y: [5, 5],
        mode: "lines",
        line: {
            color: GRAY_COLOR,
            width: 1,
        },
    };
    const trace = [
        horizontalDottedLine,
        {
            x,
            y,
            type: "scatter" as const,
            mode: "lines+markers" as const,
            name: "equilibrium",
            marker: { color: colors },
            line: {
                color: GRAY_COLOR,
                shape: "spline" as const,
                width: 1,
                dash: "dot" as Dash,
            },
        },
    ];

    const layout = {
        ...BASE_PLOT_LAYOUT,
        showlegend: false,
        height: 130,
        xaxis: {
            ...AXIS_SETTINGS,
            range: [0, maxConcentration],
            title: `[B] ${MICRO}M`,
            titlefont: {
                ...AXIS_SETTINGS.titlefont,
                color: AGENT_B_COLOR,
            },
        },
        yaxis: {
            ...AXIS_SETTINGS,
            range: [0, maxConcentration / 2],
            title: `[AB] ${MICRO}M`,
            titlefont: {
                ...AXIS_SETTINGS.titlefont,
                color: AGENT_AB_COLOR,
            },
        },
    };
    return (
        <div className={plotStyles.plotContainer}>
            <Plot data={trace} layout={layout} config={CONFIG} />
        </div>
    );
};

export default EquilibriumPlot;
