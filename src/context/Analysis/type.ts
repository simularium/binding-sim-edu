import { ProductOverTimeTrace } from "../../components/plots/types";

interface AnalysisContextType {
    currentProductConcentrationArray: number[];
    productOverTimeTraces: ProductOverTimeTrace[];
    handleRecordEquilibrium: () => void;
    equilibriumConcentrations: {
        inputConcentrations: number[];
        productConcentrations: number[];
    };
}

export default AnalysisContextType;
