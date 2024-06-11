import React, { ReactNode, useContext, useState } from "react";

import VisibilityControl from "../shared/VisibilityControl";
import ProductConcentrationPlot from "../plots/ProductConcentrationPlot";
import EquilibriumPlot from "../plots/EquilibriumPlot";
import RecordEquilibriumButton from "../RecordEquilibriumButton";

import styles from "./layout.module.css";
import { AB } from "../agent-symbols";
import ResizeContainer from "../shared/ResizeContainer";
import { AnalysisContext, SimulariumContext } from "../../context/context";

interface RightPanelProps {
    currentAdjustableAgentConcentration: number;

    equilibriumFeedback: ReactNode | string;
}

const RightPanel: React.FC<RightPanelProps> = ({
    equilibriumFeedback,
    currentAdjustableAgentConcentration,
}) => {
    const { productName } = useContext(SimulariumContext);
    const {
        productOverTimeTraces,
        currentProductConcentrationArray,
        equilibriumConcentrations,
    } = useContext(AnalysisContext);
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
        <ResizeContainer
            setWidth={setWidth}
            setHeight={setHeight}
            style={{ height: "100%" }}
        >
            <VisibilityControl excludedPages={[0, 1, 2]}>
                <h3>
                    Concentration over time for <AB name={productName} />
                </h3>
                <ProductConcentrationPlot
                    data={data}
                    width={width}
                    height={height / 3}
                />
            </VisibilityControl>

            <VisibilityControl excludedPages={[0, 1, 2, 9, 10]}>
                <h3>Equilibrium concentration</h3>
                <EquilibriumPlot
                    width={width}
                    height={height / 3}
                    x={equilibriumConcentrations.inputConcentrations}
                    y={equilibriumConcentrations.productConcentrations}
                />
                <div className={styles.recordButton}>
                    <RecordEquilibriumButton />
                </div>
                <div className={styles.feedback}>{equilibriumFeedback}</div>
            </VisibilityControl>
        </ResizeContainer>
    );
};

export default RightPanel;
