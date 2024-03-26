import React from 'react';
import ViewSwitch from './ViewSwitch';
import PlayButton from './PlayButton';
import EquilibriumQuestion from './EquilibriumQuestion';

interface CenterPanelProps {
}

const CenterPanel: React.FC<CenterPanelProps> = () => {
    return (
        <div>
            <ViewSwitch />
            <PlayButton />
            <EquilibriumQuestion />
        </div>
    );
};

export default CenterPanel;
