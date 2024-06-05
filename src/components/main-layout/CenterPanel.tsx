import React from "react";
import ViewSwitch from "../ViewSwitch";
import EquilibriumQuestion from "../quiz-questions/EquilibriumQuestion";
import KdQuestion from "../quiz-questions/KdQuestion";
import { Module } from "../../types";
import FinalPage from "../FinalPage";
import VisibilityControl from "../shared/VisibilityControl";

interface CenterPanelProps {
    reactionType: Module;
}

const CenterPanel: React.FC<CenterPanelProps> = ({ reactionType }) => {
    return (
        <>
            <ViewSwitch />
            <EquilibriumQuestion />
            <KdQuestion reactionType={reactionType} />
            <VisibilityControl includedPages={[10]}>
                <FinalPage />
            </VisibilityControl>
        </>
    );
};
1;

export default CenterPanel;
