import { sortedIndex } from "lodash";

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
