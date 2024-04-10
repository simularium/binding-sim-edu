export const enum ReactionType {
    A_B_AB = "high affinity",
    A_C_AC = "low affinity",
    A_B_C_AB_AC = "competitive",
}

export const kds = {
    [ReactionType.A_B_AB]: 10, // TODO: get actual values
    [ReactionType.A_C_AC]: 10, 
    [ReactionType.A_B_C_AB_AC]: 5,
};
