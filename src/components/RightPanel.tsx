import React from 'react';
import Plot from './Plot';

interface RightPanelProps {
    productOverTime: {[key: number]: number[]};
}

const RightPanel: React.FC<RightPanelProps> = ({ productOverTime }) => {
    return <Plot data={productOverTime} />;
};

export default RightPanel;