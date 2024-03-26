import React from 'react';
import ViewSwitch from '../ViewSwitch';
import PlayButton from '../PlayButton';
import EquilibriumQuestion from '../QuizQuestions/EquilibriumQuestion';
import KdQuestion from '../QuizQuestions/KdQuestion';
import { ReactionType } from '../../constants';

interface CenterPanelProps {
    reactionType: ReactionType;
}

const CenterPanel: React.FC<CenterPanelProps> = ({ reactionType }) => {
    return (
        <div>
            <ViewSwitch />
            <PlayButton />
            <EquilibriumQuestion />
            <KdQuestion reactionType={reactionType} />
        </div>
    );
};

export default CenterPanel;
