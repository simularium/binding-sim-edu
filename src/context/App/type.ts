import { Module } from "../../types";

interface AppContextType {
    setPage: (value: number) => void;
    page: number;
    currentModule: Module;
    hasProgressed: boolean;
}

export default AppContextType;
