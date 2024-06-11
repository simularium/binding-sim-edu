import React from "react";
import ViewSwitch from "../ViewSwitch";
import EquilibriumQuestion from "../quiz-questions/EquilibriumQuestion";
import KdQuestion from "../quiz-questions/KdQuestion";

interface CenterPanelProps {
    hasProgressed: boolean;
}

const CenterPanel: React.FC<CenterPanelProps> = ({ hasProgressed }) => {
    return (
        <>
            <ViewSwitch hasProgressed={hasProgressed} />
            <EquilibriumQuestion />
            <KdQuestion />
        </>
    );
};

export default CenterPanel;
