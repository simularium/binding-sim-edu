import React, { useContext } from "react";
import Plot from "./ProductConcentrationPlot";
import VisibilityControl from "./VisibilityControl";
import { SimulariumContext } from "../simulation/context";

interface RightPanelProps {
    productOverTime: { [key: number]: number[] };
}

const RightPanel: React.FC<RightPanelProps> = ({ productOverTime }) => {
    const { page } = useContext(SimulariumContext);

    return (
        <VisibilityControl excludedPages={[0, 1, 2]} currentPage={page}>
            <Plot data={productOverTime} />
        </VisibilityControl>
    );
};

export default RightPanel;
