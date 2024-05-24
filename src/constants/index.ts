import { Module } from "../types";

export const kds = {
    [Module.A_B_AB]: 10, // TODO: get actual values
    [Module.A_C_AC]: 10,
    [Module.A_B_C_AB_AC]: 5,
};

export const MICRO = String.fromCharCode(956);
export const DEFAULT_VIEWPORT_SIZE = { width: 500, height: 500 };
export const LIVE_SIMULATION_NAME = "Binding Affinity Simulation";
