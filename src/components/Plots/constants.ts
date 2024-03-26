import { AXIS_COLOR, BACKGROUND_COLOR } from "../../constants/colors";

export const PLOT_COLORS = [
    "#a6cee3",
    "#b2df8a",
    "#33a02c",
    "#fb9a99",
    "#1f78b4",
    "#e31a1c",
    "#fdbf6f",
    "#ff7f00",
    "#cab2d6",
];

export const BASE_PLOT_LAYOUT = {
    xaxis: { range: [0, "auto"], color: AXIS_COLOR },
    yaxis: { color: AXIS_COLOR },
    paper_bgcolor: BACKGROUND_COLOR,
    plot_bgcolor: BACKGROUND_COLOR,
    width: 300,
    height: 200,
    margin: { l: 40, r: 10, b: 40, t: 20 },
};
