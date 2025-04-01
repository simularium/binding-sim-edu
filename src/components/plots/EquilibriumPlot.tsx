import React, { useContext } from "react";
import Plot from "react-plotly.js";

import {
    AXIS_SETTINGS,
    BASE_PLOT_LAYOUT,
    CONFIG,
    GRAY_COLOR,
} from "./constants";
import { SimulariumContext } from "../../simulation/context";
import { AGENT_A_COLOR } from "../../constants/colors";
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
    const {
        fixedAgentStartingConcentration,
        productName,
        getAgentColor,
        adjustableAgentName,
    } = useContext(SimulariumContext);
    const xMax = Math.max(...x);
    const xAxisMax = Math.max(kd * 2, xMax * 1.1);
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
        x: [0, xAxisMax],
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
        x: [0, xAxisMax],
        y: [10, 10],
        mode: "lines",
        name: "Initial [A]",
        hoverlabel: { bgcolor: AGENT_A_COLOR },
        hovertemplate: "Initial [A]",
        line: lineOptions,
    };
    const traces = [
        horizontalLine,
        horizontalLineMax,
        {
            x,
            y,
            type: "scatter" as const,
            mode: "lines+markers" as const,
            name: "collected data",
            marker: { color: colors },
            line: {
                color: GRAY_COLOR,
                shape: "spline" as const,
                width: 1,
            },
            hovertemplate: `[${adjustableAgentName}]: <b>%{x:.1f}</b><br>[${productName}]: <b>%{y:.1f}</b><extra></extra>`,
        },
    ];

    const layout = {
        ...BASE_PLOT_LAYOUT,
        showlegend: false,
        width: width,
        height: Math.max(130, height),
        xaxis: {
            ...AXIS_SETTINGS,
            range: [-10, xAxisMax],
            title: `[${adjustableAgentName}] ${MICRO}M`,
            titlefont: {
                ...AXIS_SETTINGS.titlefont,
                color: getAgentColor(adjustableAgentName),
            },
        },
        yaxis: {
            ...AXIS_SETTINGS,
            range: [0, fixedAgentStartingConcentration + 0.25], // the line gets cut off without the extra 0.25
            title: `[${productName}] ${MICRO}M`,
            titlefont: {
                ...AXIS_SETTINGS.titlefont,
                color: getAgentColor(productName),
            },
            tickmode: "array" as const,
            tickvals: [
                0,
                fixedAgentStartingConcentration / 2,
                fixedAgentStartingConcentration,
            ],
        },
    };
    return (
        <div className={plotStyles.plotContainer}>
            {x.length === 0 && hintOverlay}
            <Plot
                data={x.length ? traces : []}
                layout={layout}
                config={CONFIG}
            />
        </div>
    );
};

export default EquilibriumPlot;
