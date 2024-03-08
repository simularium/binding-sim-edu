import React from 'react';
import ViewSwitch from './ViewSwitch';

interface CenterPanelProps {
}

const CenterPanel: React.FC<CenterPanelProps> = () => {
    return (
        <div>
            <ViewSwitch />
        </div>
    );
};

export default CenterPanel;