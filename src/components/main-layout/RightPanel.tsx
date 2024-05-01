import React, { ReactNode, useState } from "react";

import VisibilityControl from "../shared/VisibilityControl";
import ProductConcentrationPlot from "../plots/ProductConcentrationPlot";
import EquilibriumPlot from "../plots/EquilibriumPlot";
import RecordEquilibriumButton from "../RecordEquilibriumButton";
import { ProductOverTimeTrace } from "../plots/types";

import styles from "./layout.module.css";
import { AB } from "../agent-symbols";
import ResizeContainer from "../shared/ResizeContainer";

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
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
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
        <ResizeContainer setWidth={setWidth} setHeight={setHeight} style={{height: "100%"}}>
            <VisibilityControl excludedPages={[0, 1, 2]}>
                <h3>
                    Concentration over time for <AB />
                </h3>
                <ProductConcentrationPlot
                    data={data}
                    width={width}
                    height={height / 3}
                />
                <h3>Equilibrium concentration</h3>

                <EquilibriumPlot
                    width={width}
                    height={height / 3}
                    x={equilibriumConcentrations.inputConcentrations}
                    y={equilibriumConcentrations.productConcentrations}
                />
                <div className={styles.recordButton}>
                    <RecordEquilibriumButton
                        handleRecordEquilibrium={handleRecordEquilibrium}
                    />
                </div>
                <div className={styles.feedback}>{equilibriumFeedback}</div>
            </VisibilityControl>
        </ResizeContainer>
    );
};

export default RightPanel;
