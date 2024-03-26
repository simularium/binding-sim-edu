import { PLOT_COLORS } from "./constants";

export const getColorIndex = (value: number | string) => Number(value) % PLOT_COLORS.length;
