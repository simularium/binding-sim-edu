import { Module, ProductName } from "../types";

export const kds = {
    [Module.A_B_AB]: 10, // TODO: get actual values
    [Module.A_C_AC]: 10,
    [Module.A_B_C_AB_AC]: 5,
};

export const CURRENT_PRODUCT = {
    [Module.A_B_AB]: ProductName.AB,
    [Module.A_C_AC]:  ProductName.AC,
    [Module.A_B_C_AB_AC]: ProductName.AB,
};

export const MICRO = String.fromCharCode(956);
export const DEFAULT_VIEWPORT_SIZE = { width: 500, height: 500 };
export const EXAMPLE_TRAJECTORY_URLS = {
    [Module.A_B_AB]:
        "https://aics-simularium-data.s3.us-east-2.amazonaws.com/trajectory/binding-affinity_antibodies.simularium",
    [Module.A_C_AC]:
        "https://aics-simularium-data.s3.us-east-2.amazonaws.com/trajectory/binding-affinity_hemoglobin.simularium",
    [Module.A_B_C_AB_AC]:
        "https://aics-simularium-data.s3.us-east-2.amazonaws.com/trajectory/binding-affinity_hemoglobin-co.simularium",
};
