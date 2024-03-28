export const enum ReactionType {
    A_B_AB = "high affinity",
    A_C_AC = "low affinity",
    A_B_C_AB_AC = "competitive",
}

const BACKGROUND_COLOR = "#141219";
const AXIS_COLOR = "#D3D3D3";

export const BASE_PLOT_LAYOUT = {
    xaxis: { range: [0, "auto"], color: AXIS_COLOR },
    yaxis: { color: AXIS_COLOR },
    paper_bgcolor: BACKGROUND_COLOR,
    plot_bgcolor: BACKGROUND_COLOR,
    width: 300,
    height: 200,
    margin: { l: 40, r: 10, b: 40, t: 20 },
};

export const kds = {
    [ReactionType.A_B_AB]: 10, // TODO: get actual values
    [ReactionType.A_C_AC]: 10, 
    [ReactionType.A_B_C_AB_AC]: 5,
};
