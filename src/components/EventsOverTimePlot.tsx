import React from "react";
import Plot from "react-plotly.js";

interface PlotProps {
    bindingEventsOverTime: number[]
    unbindingEventsOverTime: number[]
}

const EventsOverTimePlot: React.FC<PlotProps> = ({
    bindingEventsOverTime,
    unbindingEventsOverTime,
}) => {
       
    const layout={
            xaxis: { range: [0, "auto"] },
        }
    // the two arrays will always be the same length
    // so this time calculation only needs to happen once
    const time = bindingEventsOverTime.map((_, i) => i * 10);
    return (
        <>
            <h1>Reaction events over time</h1>
            <Plot
                data={[
                    {
                        x: time,
                        y: bindingEventsOverTime,
                        type: "bar" as const,
                        name: "bind events",
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
                    },
                ]}
                layout={{ ...layout, title: "AB -> A + B" }}
            />
        </>
    );
};

export default EventsOverTimePlot;
