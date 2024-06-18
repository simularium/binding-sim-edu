import { createContext } from "react";
import { DEFAULT_APP_STATE } from "./default";
import AppContextType from "./type";

const AppContext = createContext({
    ...DEFAULT_APP_STATE,
    setPage: () => {},
} as AppContextType);

export default AppContext;
