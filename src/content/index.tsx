import { Module, PageContent } from "../types";
import { highAffinityContentArray } from "./HighAffinity";
import { lowAffinityContentArray } from "./LowAffinity";
import { competitiveArray } from "./Competitive";

export const moduleNames = {
    [Module.A_B_AB]: "High Affinity",
    [Module.A_C_AC]: "Low Affinity",
    [Module.A_B_D]: "Competitive Binding",
};

export const FIRST_PAGE = 1;

export default {
    [Module.A_B_AB]: highAffinityContentArray,
    [Module.A_C_AC]: lowAffinityContentArray,
    [Module.A_B_D]: competitiveArray,
} as { [key in Module]: PageContent[] };
