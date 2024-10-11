import React, { useContext } from "react";
import Plot from "react-plotly.js";

import {
    AXIS_SETTINGS,
    BASE_PLOT_LAYOUT,
    CONFIG,
    GRAY_COLOR,
} from "./constants";
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

    const hintOverlay = (
        <div
            style={{
                position: "absolute",
                width: 91,
                fontSize: 11,
                fontStyle: "italic",
                textAlign: "center",
                color: "#A0A0A0",
                right: "50%",
                top: "50%",
                transform: "translate(50%, -50%)",
            }}
        >
            Record point of equilibrium to plot a value
        </div>
    );

    const lineOptions = {
        color: AGENT_A_COLOR,
        width: 0.5,
        dash: "dot" as Dash,
    };

    const horizontalLine = {
        x: [0, kd * 2],
        y: [5, 5],
        mode: "lines",
        name: "50% bound",
        hovertemplate: "50% bound",
        hoverlabel: {
            bgcolor: AGENT_A_COLOR,
        },
        line: lineOptions,
    };
    const horizontalLineMax = {
        x: [0, kd * 2],
        y: [10, 10],
        mode: "lines",
        name: "Initial [A]",
        hoverlabel: { bgcolor: AGENT_A_COLOR },
        hovertemplate: "Initial [A]",
        line: lineOptions,
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
            range: [0, kd * 2],
            title: `[B] ${MICRO}M`,
            titlefont: {
                ...AXIS_SETTINGS.titlefont,
                color: AGENT_B_COLOR,
            },
        },
        yaxis: {
            ...AXIS_SETTINGS,
            range: [0, maxConcentration + 0.25], // the line gets cut off without the extra 0.25
            title: `[AB] ${MICRO}M`,
            titlefont: {
                ...AXIS_SETTINGS.titlefont,
                color: AGENT_AB_COLOR,
            },
            tickmode: "array" as const,
            tickvals: [0, maxConcentration / 2, maxConcentration],
        },
    };
    return (
        <div className={plotStyles.plotContainer}>
            {x.length === 0 && hintOverlay}
            <Plot
                data={x.length ? trace : []}
                layout={layout}
                config={CONFIG}
            />
        </div>
    );
};

export default EquilibriumPlot;
