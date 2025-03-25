import { sortedIndex } from "lodash";
import { PLOT_COLORS } from "../components/plots/constants";
import { NANO } from "../constants";

export const insertIntoArray = <T>(
    array: T[],
    index: number,
    value: T
): T[] => {
    return [...array.slice(0, index), value, ...array.slice(index)];
};

export const insertValueSorted = (
    array: number[],
    value: number
): { newArray: number[]; index: number } => {
    const index = sortedIndex(array, value);
    return { newArray: insertIntoArray(array, index, value), index };
};

export const updateArrayInState = <T>(
    array: T[],
    index: number,
    value: T,
    setArray: (arg0: T[]) => void
) => {
    const newArray = insertIntoArray(array, index, value);
    setArray(newArray);
};

export const getColorIndex = (value: number | string, maxValue: number) => {
    // this is dividing by 2 because the value is always an even number
    return Math.floor((Number(value) / 2 / maxValue) * 10) % PLOT_COLORS.length;
};

export const indexToTime = (
    index: number,
    timeFactor: number,
    timeUnit: string
) => {
    if (timeUnit === NANO) {
        return (index * timeFactor) / 1000;
    } else {
        return index * timeFactor;
    }
};

export const isSlopeZero = (array: number[]) => {
    const sliceSize = 25;
    const averageOfLastFive =
        array.slice(-sliceSize).reduce((a, b) => a + b) / sliceSize;
    const averageOfFirstFive =
        array.slice(-sliceSize * 2, -sliceSize).reduce((a, b) => a + b) /
        sliceSize;
    const slope = averageOfLastFive - averageOfFirstFive;
    if (Math.abs(slope) < 0.05) {
        return true;
    } else {
        return false;
    }
};
