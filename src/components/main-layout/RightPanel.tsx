import React, { ReactNode } from "react";

import VisibilityControl from "../shared/VisibilityControl";
import ProductConcentrationPlot from "../plots/ProductConcentrationPlot";
import EquilibriumPlot from "../plots/EquilibriumPlot";
import RecordEquilibriumButton from "../RecordEquilibriumButton";
import { ProductOverTimeTrace } from "../plots/types";
import styles from "./layout.module.css";
interface RightPanelProps {
    productOverTimeTraces: ProductOverTimeTrace[];
    currentProductConcentrationArray: number[];
    currentAdjustableAgentConcentration: number;
    handleRecordEquilibrium: () => void;
    equilibriumConcentrations: {
        inputConcentrations: number[];
        productConcentrations: number[];
    };
    equilibriumFeedback: ReactNode | string;
}

const RightPanel: React.FC<RightPanelProps> = ({
    productOverTimeTraces,
    handleRecordEquilibrium,
    equilibriumConcentrations,
    equilibriumFeedback,
    currentProductConcentrationArray,
    currentAdjustableAgentConcentration,
}) => {
    let data = productOverTimeTraces;
    if (currentProductConcentrationArray.length > 1) {
        data = [
            ...productOverTimeTraces,
            {
                inputConcentration: currentAdjustableAgentConcentration,
                productConcentrations: currentProductConcentrationArray,
            },
        ];
    }
    return (
        <>
            <VisibilityControl excludedPages={[0, 1, 2]}>
                <ProductConcentrationPlot data={data} />
                <EquilibriumPlot
                    x={equilibriumConcentrations.inputConcentrations}
                    y={equilibriumConcentrations.productConcentrations}
                />
                <RecordEquilibriumButton
                    handleRecordEquilibrium={handleRecordEquilibrium}
                />
                <div className={styles.feedback}>{equilibriumFeedback}</div>
            </VisibilityControl>
        </>
    );
};

export default RightPanel;
