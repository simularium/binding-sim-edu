import React from "react";
import ProductConcentrationPlot from "./ProductConcentrationPlot";
import VisibilityControl from "./VisibilityControl";

interface RightPanelProps {
    productOverTime: { [key: number]: number[] };
}

const RightPanel: React.FC<RightPanelProps> = ({ productOverTime }) => {

    return (
        <VisibilityControl excludedPages={[0, 1, 2]} >
            <ProductConcentrationPlot data={productOverTime} />
        </VisibilityControl>
    );
};

export default RightPanel;
