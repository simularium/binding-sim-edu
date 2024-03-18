import React from 'react';
import ViewSwitch from './ViewSwitch';
import PlayButton from './PlayButton';

interface CenterPanelProps {
}

const CenterPanel: React.FC<CenterPanelProps> = () => {
    return (
        <div>
            <ViewSwitch />
            <PlayButton />
        </div>
    );
};

export default CenterPanel;
