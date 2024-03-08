import React from 'react';
import ViewSwitch from './ViewSwitch';
import ProgressionControl from './ProgressionControl';

interface CenterPanelProps {
}

const CenterPanel: React.FC<CenterPanelProps> = () => {
    return (
        <div>
            <ProgressionControl onPage={1}>
                <ViewSwitch />
            </ProgressionControl>
        </div>
    );
};

export default CenterPanel;