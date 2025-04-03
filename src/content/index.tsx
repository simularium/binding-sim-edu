import { Module, PageContent } from "../types";
import { highAffinityContentArray } from "./HighAffinity";
import { lowAffinityContentArray } from "./LowAffinity";

export const moduleNames = {
    [Module.A_B_AB]: "High Affinity",
    [Module.A_C_AC]: "Low Affinity",
    [Module.A_B_C_AB_AC]: "Competitive Binding",
};

export const FIRST_PAGE = {
    [Module.A_B_AB]: 0, // landing page
    [Module.A_C_AC]: 1,
    [Module.A_B_C_AB_AC]: 1,
};

export default {
    [Module.A_B_AB]: highAffinityContentArray,
    [Module.A_C_AC]: lowAffinityContentArray,
    [Module.A_B_C_AB_AC]: [], // Add appropriate PageContent[] for Competitive Binding
} as { [key in Module]: PageContent[] };
