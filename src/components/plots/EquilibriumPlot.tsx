import React, { useContext } from "react";
import Plot from "react-plotly.js";

import {
    AXIS_SETTINGS,
    BASE_PLOT_LAYOUT,
    CONFIG,
    GRAY_COLOR,
} from "./constants";
import { SimulariumContext } from "../../simulation/context";
import { AGENT_AB_COLOR, AGENT_B_COLOR } from "../../constants/colors";
import { MICRO } from "../../constants";

import plotStyles from "./plots.module.css";
import { Dash } from "plotly.js";

interface PlotProps {
    x: number[];
    y: number[];
    height: number;
    width: number;
    colors: string[];
    kd: number;
}

const EquilibriumPlot: React.FC<PlotProps> = ({
    x,
    y,
    height,
    width,
    colors,
    kd,
}) => {
    const { maxConcentration } = useContext(SimulariumContext);

    const horizontalDottedLine = {
        x: [0, kd * 2],
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
        width: width,
        height: Math.max(130, height),
        xaxis: {
            ...AXIS_SETTINGS,
            range: [0, kd * 2],
            title: `[B] ${MICRO}M`,
            titlefont: {
                ...AXIS_SETTINGS.titlefont,
                color: AGENT_B_COLOR,
            },
        },
        yaxis: {
            ...AXIS_SETTINGS,
            range: [0, maxConcentration],
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
