import React from 'react';
import Concentration from './Concentration';
import { AvailableAgentNames } from '../types';
import VisibilityControl from './VisibilityControl';

interface LeftPanelProps {
    page: number;
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
    page,
}) => {
    return (
        <div>
            <VisibilityControl excludedPages={[0, 1]} currentPage={page}>
                <Concentration
                    activeAgents={activeAgents}
                    concentration={inputConcentration}
                    onChange={handleNewInputConcentration}
                    disabled={isPlaying}
                />
            </VisibilityControl>
        </div>
    );
};

export default LeftPanel;