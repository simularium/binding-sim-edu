import React from 'react';
import ViewSwitch from './ViewSwitch';
import ProgressionControl from './ProgressionControl';
import PlayButton from './PlayButton';

interface CenterPanelProps {
}

const CenterPanel: React.FC<CenterPanelProps> = () => {
    return (
        <div>
            <ProgressionControl onPage={1}>
                <ViewSwitch />
            </ProgressionControl>
            <ProgressionControl onPage={2}>
                <PlayButton/>
            </ProgressionControl>
        </div>
    );
};

export default CenterPanel;