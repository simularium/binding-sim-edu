import React from "react";
import Plot from "react-plotly.js";
import { BASE_PLOT_LAYOUT } from "../constants";

interface PlotProps {
    bindingEventsOverTime: number[]
    unbindingEventsOverTime: number[]
}

const EventsOverTimePlot: React.FC<PlotProps> = ({
    bindingEventsOverTime,
    unbindingEventsOverTime,
}) => {
       
    const layout={
            ...BASE_PLOT_LAYOUT,
            xaxis: { range: [0, "auto"] },
        }
    // the two arrays will always be the same length
    // so this time calculation only needs to happen once
    const time = bindingEventsOverTime.map((_, i) => i * 10);
    return (
        <>
            <h4>Reaction events over time</h4>
            <Plot
                data={[
                    {
                        x: time,
                        y: bindingEventsOverTime,
                        type: "bar" as const,
                        name: "bind events",
                        marker: { color: "#979797" },
                    },
                ]}
                layout={{ ...layout, title: "A + B -> AB" }}
            />
            <Plot
                data={[
                    {
                        x: time,
                        y: unbindingEventsOverTime,
                        type: "bar" as const,
                        name: "unbind events",
                        marker: { color: "#979797" },
                    },
                ]}
                layout={{ ...layout, title: "AB -> A + B" }}
            />
        </>
    );
};

export default EventsOverTimePlot;
