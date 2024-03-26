import React, { useContext } from "react";
import ProductConcentrationPlot from "../Plots/ProductConcentrationPlot";
import VisibilityControl from "../Shared/VisibilityControl";
import RecordEquilibriumButton from "../RecordEquilibriumButton";
import EquilibriumPlot from "../Plots/EquilibriumPlot";
import { SimulariumContext } from "../../simulation/context";
import { ProductOverTimeTrace } from "../Plots/types";

interface RightPanelProps {
    handleRecordEquilibrium: () => void;
    equilibriumConcentrations: {
        inputConcentrations: number[];
        productConcentrations: number[];
    };
    equilibriumFeedback: string;
    productOverTimeTraces: ProductOverTimeTrace[];
    currentAdjustableAgentConcentration: number;
    currentProductConcentrationArray: number[];
}

const RightPanel: React.FC<RightPanelProps> = ({
    productOverTimeTraces,
    currentProductConcentrationArray,
    currentAdjustableAgentConcentration,
    handleRecordEquilibrium,
    equilibriumConcentrations,
    equilibriumFeedback,
}) => {
    const { timeFactor } = useContext(SimulariumContext);
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
        <div style={{ minWidth: 260, flex: "1 1 30%" }}>
            <VisibilityControl excludedPages={[0, 1, 2]}>
                <ProductConcentrationPlot data={data} timeFactor={timeFactor} />
                <EquilibriumPlot
                    x={equilibriumConcentrations.inputConcentrations}
                    y={equilibriumConcentrations.productConcentrations}
                />
                <RecordEquilibriumButton
                    handleRecordEquilibrium={handleRecordEquilibrium}
                />
                <div>{equilibriumFeedback}</div>
            </VisibilityControl>
        </div>
    );
};

export default RightPanel;
