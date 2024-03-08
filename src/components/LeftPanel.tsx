import React from 'react';
import Concentration from './Concentration';
import { AvailableAgentNames } from '../types';

interface LeftPanelProps {
    activeAgents: AvailableAgentNames[];
    inputConcentration: { [key in AvailableAgentNames]: number };
    isPlaying: boolean;
    handleNewInputConcentration: (name: string, value: number) => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
    activeAgents,
    inputConcentration,
    handleNewInputConcentration,
    isPlaying,
}) => {

    return (
        <div>
            <Concentration
                activeAgents={activeAgents}
                concentration={inputConcentration}
                onChange={handleNewInputConcentration}
                disabled={isPlaying}
            />
        </div>
    );
};

export default LeftPanel;