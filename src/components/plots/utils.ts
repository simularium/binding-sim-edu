import { PLOT_COLORS } from "./constants";

export const getColorIndex = (value: number | string, maxValue: number ) => {

    return Number(value) / maxValue * 10 % PLOT_COLORS.length
};
