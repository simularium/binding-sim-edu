import React from 'react';
import ViewSwitch from '../ViewSwitch';
import EquilibriumQuestion from '../quiz-questions/EquilibriumQuestion';
import KdQuestion from '../quiz-questions/KdQuestion';
import { ReactionType } from '../../constants';

interface CenterPanelProps {
    reactionType: ReactionType;
}

const CenterPanel: React.FC<CenterPanelProps> = ({ reactionType }) => {
    return (
        <>
            <ViewSwitch />
            <EquilibriumQuestion />
            <KdQuestion reactionType={reactionType} />
        </>
    );
};

export default CenterPanel;
