import { sortedIndex } from "lodash";

export const insertIntoArray = (
    array: unknown[],
    index: number,
    value: unknown
) => {
    return [...array.slice(0, index), value, ...array.slice(index)];
};

export const insertValueSorted = (array: number[], value: number) => {
    const index = sortedIndex(array, value);
    return { newArray: insertIntoArray(array, index, value), index };
};
