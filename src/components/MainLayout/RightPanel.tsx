import React, { useContext } from "react";
import ProductConcentrationPlot from "../Plots/ProductConcentrationPlot";
import VisibilityControl from "../Shared/VisibilityControl";
import RecordEquilibriumButton from "../RecordEquilibriumButton";
import EquilibriumPlot from "../Plots/EquilibriumPlot";
import { SimulariumContext } from "../../simulation/context";

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
    const { timeFactor } = useContext(SimulariumContext);
    return (
        <div style={{ minWidth: 260, flex: "1 1 30%" }}>
            <VisibilityControl excludedPages={[0, 1, 2]}>
                <ProductConcentrationPlot
                    data={productOverTime}
                    timeFactor={timeFactor}
                />
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
