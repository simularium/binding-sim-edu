import { PLOT_COLORS } from "./constants";

export const getColorIndex = (value: number | string, maxValue: number) => {
    // this is dividing by 2 because the value is always an even number
    return Math.floor((Number(value) / 2 / maxValue) * 10) % PLOT_COLORS.length;
};
