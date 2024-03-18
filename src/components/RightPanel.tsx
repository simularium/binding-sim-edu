import React, { useContext } from "react";
import ProductConcentrationPlot from "./ProductConcentrationPlot";
import VisibilityControl from "./VisibilityControl";
import { SimulariumContext } from "../simulation/context";
import RecordEquilibriumButton from "./RecordEquilibriumButton";

interface RightPanelProps {
    productOverTime: { [key: number]: number[] };
    handleRecordEquilibrium: () => void;
    equilibriumConcentrations: {
        [key: string]: number[];
    };
}

const RightPanel: React.FC<RightPanelProps> = ({
    productOverTime,
    handleRecordEquilibrium,
    equilibriumConcentrations,
}) => {
    const { page } = useContext(SimulariumContext);
    console.log(equilibriumConcentrations)
    return (
        <div style={{ minWidth: 260, flex: "1 1 30%" }}>
            <VisibilityControl excludedPages={[0, 1, 2]} currentPage={page}>
                <ProductConcentrationPlot data={productOverTime} />
            </VisibilityControl>
            <VisibilityControl excludedPages={[0, 1, 2]} currentPage={page}>
                <RecordEquilibriumButton
                    handleRecordEquilibrium={handleRecordEquilibrium}
                />
            </VisibilityControl>
        </div>
    );
};

export default RightPanel;
