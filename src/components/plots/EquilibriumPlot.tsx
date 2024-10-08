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
import {
    AGENT_AB_COLOR,
    AGENT_A_COLOR,
    AGENT_B_COLOR,
} from "../../constants/colors";
import { MICRO } from "../../constants";

import plotStyles from "./plots.module.css";
import { Dash } from "plotly.js";

interface PlotProps {
    x: number[];
    y: number[];
    height: number;
    width: number;
}

const EquilibriumPlot: React.FC<PlotProps> = ({ x, y, height, width }) => {
    const { maxConcentration } = useContext(SimulariumContext);
    const colors = x.map(
        (value) => PLOT_COLORS[getColorIndex(value, maxConcentration)]
    );
    const maxPlusBuffer = maxConcentration + 1;

    const horizontalLine = {
        x: [0, maxPlusBuffer],
        y: [5, 5],
        mode: "lines",
        name: "50% bound",
        hovertemplate: "50% bound",
        hoverlabel: {
            bgcolor: AGENT_A_COLOR,
            strokecolor: AGENT_A_COLOR,
        },

        line: {
            color: AGENT_A_COLOR,
            width: 0.5,
        },
    };
    const horizontalLineMax = {
        x: [0, maxPlusBuffer],
        y: [10, 10],
        mode: "lines",
        name: "Initial [A]",
        hoverlabel: { bgcolor: AGENT_A_COLOR },

        hovertemplate: "Initial [A]",
        line: {
            color: AGENT_A_COLOR,
            width: 0.5,
        },
    };
    const trace = [
        horizontalLine,
        horizontalLineMax,
        {
            x,
            y,
            type: "scatter" as const,
            mode: "lines+markers" as const,
            name: "",
            marker: { color: colors },
            line: {
                color: GRAY_COLOR,
                shape: "spline" as const,
                width: 1,
                dash: "dot" as Dash,
            },
            hovertemplate: "[B]: <b>%{x:.1f}</b><br>[AB]: <b>%{y:.1f}</b>",
        },
    ];

    const layout = {
        ...BASE_PLOT_LAYOUT,
        showlegend: false,
        width: width,
        height: Math.max(130, height),
        xaxis: {
            ...AXIS_SETTINGS,
            range: [0, maxPlusBuffer],
            title: `[B] ${MICRO}M`,
            titlefont: {
                ...AXIS_SETTINGS.titlefont,
                color: AGENT_B_COLOR,
            },
        },
        yaxis: {
            ...AXIS_SETTINGS,
            range: [0, maxConcentration + 0.25],
            title: `[AB] ${MICRO}M`,
            titlefont: {
                ...AXIS_SETTINGS.titlefont,
                color: AGENT_AB_COLOR,
            },
            tickmode: "array" as const,
            tickvals: [0, 5, 10],
            ticktext: ["0", "5", "10"],
        },
    };
    return (
        <div className={plotStyles.plotContainer}>
            <Plot data={trace} layout={layout} config={CONFIG} />
        </div>
    );
};

export default EquilibriumPlot;
