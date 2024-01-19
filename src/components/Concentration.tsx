import React from 'react';
import Slider from './Slider';
import { map } from 'lodash';
import { AvailableAgentNames } from '../types';

interface AgentProps {
    agents: {[key in AvailableAgentNames]: number};
    onChange: (name: AvailableAgentNames, value: number) => void;
}

const Concentration: React.FC<AgentProps> = ({ agents, onChange }) => {
    return (
        map(agents, (concentration, agent: AvailableAgentNames) => {
            return (
                <Slider
                    name={agent}
                    initialValue={concentration}
                    onChange={onChange}
                />
            );}
        )
    );
};

export default Concentration;
