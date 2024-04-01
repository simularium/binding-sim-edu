export const GRAY_COLOR = "#979797";
export const PLOT_BACKGROUND_COLOR = "#141219";
export const AXIS_COLOR = "#D3D3D3";
// These plot colors are independent of the agent colors
// they are used for the plot lines that refer to the concentration values.
// They were generated by colorbrewer2.org to be qualitative while excluding
// pink, yellow, lime green, cyan, and bright orange to avoid confusion with agent colors.
export const PLOT_COLORS = [
    "#a6cee3",
    "#1f78b4",
    "#b2df8a",
    "#e31a1c",
    "#fdbf6f",
    "#cab2d6",
    "#6a3d9a",
    "#b15928",
];

export const BASE_PLOT_LAYOUT = {
    xaxis: { range: [0, "auto"], color: AXIS_COLOR },
    yaxis: { color: AXIS_COLOR },
    paper_bgcolor: PLOT_BACKGROUND_COLOR,
    plot_bgcolor: PLOT_BACKGROUND_COLOR,
    width: 300,
    height: 200,
    margin: { l: 40, r: 10, b: 40, t: 20 },
};
