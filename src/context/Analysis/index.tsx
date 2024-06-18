import { createContext } from "react";

import AnalysisContextType from "./type";
import DEFAULT_ANALYSIS_STATE from "./default";

const AnalysisContext = createContext({
    ...DEFAULT_ANALYSIS_STATE,
    equilibriumConcentrations: {
        inputConcentrations: [],
        productConcentrations: [],
    },
    handleRecordEquilibrium: () => {},
} as AnalysisContextType);

export default AnalysisContext;
