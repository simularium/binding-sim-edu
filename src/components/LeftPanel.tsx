import React, { useContext } from 'react';
import Concentration from './Concentration';
import { AvailableAgentNames } from '../types';
import VisibilityControl from './VisibilityControl';
import { SimulariumContext } from '../simulation/context';

interface LeftPanelProps {
    activeAgents: AvailableAgentNames[];
    inputConcentration: { [key in AvailableAgentNames]: number };
    handleNewInputConcentration: (name: string, value: number) => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
    activeAgents,
    inputConcentration,
    handleNewInputConcentration,
}) => {
    const { isPlaying, page } = useContext(SimulariumContext);
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