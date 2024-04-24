export const enum ReactionType {
    A_B_AB = 1,
    A_C_AC = 2,
    A_B_C_AB_AC = 3,
}

export const kds = {
    [ReactionType.A_B_AB]: 10, // TODO: get actual values
    [ReactionType.A_C_AC]: 10,
    [ReactionType.A_B_C_AB_AC]: 5,
};

export const MICRO = String.fromCharCode(956);
