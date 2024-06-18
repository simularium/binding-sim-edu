import React from "react";
import ViewSwitch from "../ViewSwitch";
import EquilibriumQuestion from "../quiz-questions/EquilibriumQuestion";
import KdQuestion from "../quiz-questions/KdQuestion";

interface CenterPanelProps {
    currentProductConcentration: number;
}

const CenterPanel: React.FC<CenterPanelProps> = ({
    currentProductConcentration,
}) => {
    return (
        <>
            <ViewSwitch
                currentProductConcentration={currentProductConcentration}
            />
            <EquilibriumQuestion />
            <KdQuestion />
        </>
    );
};

export default CenterPanel;
