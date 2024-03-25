import React, { useContext } from "react";
import ProductConcentrationPlot from "./ProductConcentrationPlot";
import VisibilityControl from "./VisibilityControl";
import { SimulariumContext } from "../simulation/context";
import RecordEquilibriumButton from "./RecordEquilibriumButton";
import EquilibriumPlot from "./EquilibriumPlot";

interface RightPanelProps {
    productOverTime: { [key: number]: number[] };
    handleRecordEquilibrium: () => void;
    equilibriumConcentrations: {
        inputConcentrations: number[];
        productConcentrations: number[];
    };
    equilibriumFeedback: string;
}

const RightPanel: React.FC<RightPanelProps> = ({
    productOverTime,
    handleRecordEquilibrium,
    equilibriumConcentrations,
    equilibriumFeedback,
}) => {
    return (
        <div style={{ minWidth: 260, flex: "1 1 30%" }}>
            <VisibilityControl excludedPages={[0, 1, 2]}>
                <ProductConcentrationPlot data={productOverTime} />
            </VisibilityControl>
            <VisibilityControl excludedPages={[0, 1, 2]}>
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
