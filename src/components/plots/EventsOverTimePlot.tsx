import React, { useContext } from "react";
import Plot from "react-plotly.js";
import { BASE_PLOT_LAYOUT, GRAY_COLOR } from "./constants";
import { SimulariumContext } from "../../simulation/context";

interface PlotProps {
    bindingEventsOverTime: number[];
    unbindingEventsOverTime: number[];
}

const EventsOverTimePlot: React.FC<PlotProps> = ({
    bindingEventsOverTime,
    unbindingEventsOverTime,
}) => {
    const { timeFactor } = useContext(SimulariumContext);
    const layout = {
        ...BASE_PLOT_LAYOUT,
        xaxis: { range: [0, "auto"] },
    };
    // the two arrays will always be the same length
    // so this time calculation only needs to happen once
    const time = bindingEventsOverTime.map((_, i) => i * 10 * timeFactor / 1000);
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
                        marker: { color: GRAY_COLOR },
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
                        marker: { color: GRAY_COLOR },
                    },
                ]}
                layout={{ ...layout, title: "AB -> A + B" }}
            />
        </>
    );
};

export default EventsOverTimePlot;
