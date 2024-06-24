import React from "react";
import ViewSwitch from "../ViewSwitch";
import EquilibriumQuestion from "../quiz-questions/EquilibriumQuestion";
import KdQuestion from "../quiz-questions/KdQuestion";
import { Module } from "../../types";

interface CenterPanelProps {
    reactionType: Module;
    hasProgressed: boolean;
}

const CenterPanel: React.FC<CenterPanelProps> = ({
    reactionType,
    hasProgressed,
}) => {
    return (
        <>
            <ViewSwitch hasProgressed={hasProgressed} />
            <EquilibriumQuestion />
            <KdQuestion reactionType={reactionType} />
        </>
    );
};

export default CenterPanel;
