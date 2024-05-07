import { CURRENT_PRODUCT } from "../constants";
import { Module, ProductName } from "../types";

export const getCurrentProduct = (module: Module): ProductName => {
    return CURRENT_PRODUCT[module];
}