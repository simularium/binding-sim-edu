import React from "react";
import Plot from "react-plotly.js";

interface PlotProps {
    data: [number[], number[]];
}

const titles: {[key: number]: string} = {
    0: "A + B -> AB",
    1: "AB -> A + B",
};

const EventsOverTimePlot: React.FC<PlotProps> = ({ data }) => {
    return (
        <>
            <h1>Reaction events over time</h1>
            {data.map((values: number[], id) => {
                if (values.length <= 1) {
                    // when the concentration is first changed it,
                    // plays one frame to update, so there is one value
                    // already but not necessarily data yet
                    return null;
                }
                const trace = [
                    {
                        x: values.map((_, i) => i),
                        y: values,
                        type: "bar" as const,
                        name: id.toString(),
                    },
                ];
                const layout = {
                    title: titles[id],
                    xaxis: { title: "Time", range: [0, "auto"] },
                    yaxis: { title: "Count of reactions" },
                };

                return <Plot data={trace} layout={layout} />;
            })}
        </>
    );
};

export default EventsOverTimePlot;
