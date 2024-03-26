import { AXIS_COLOR, BACKGROUND_COLOR } from "../../constants/colors";

export const BASE_PLOT_LAYOUT = {
    xaxis: { range: [0, "auto"], color: AXIS_COLOR },
    yaxis: { color: AXIS_COLOR },
    paper_bgcolor: BACKGROUND_COLOR,
    plot_bgcolor: BACKGROUND_COLOR,
    width: 300,
    height: 200,
    margin: { l: 40, r: 10, b: 40, t: 20 },
};
