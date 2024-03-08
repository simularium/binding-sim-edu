import React from "react";
import Plot from "./Plot";
import VisibilityControl from "./VisiblityControl";

interface RightPanelProps {
    page: number;
    productOverTime: { [key: number]: number[] };
}

const RightPanel: React.FC<RightPanelProps> = ({ productOverTime, page }) => {
    return (
        <VisibilityControl excludedPages={[0, 1, 3]} currentPage={page}>
            <Plot data={productOverTime} />
        </VisibilityControl>
    );
};

export default RightPanel;
