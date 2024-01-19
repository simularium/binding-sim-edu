import React from "react";
import Slider from "./Slider";
import { map } from "lodash";
import { AvailableAgentNames } from "../types";

interface AgentProps {
    agents: { [key in AvailableAgentNames]: number };
    onChange: (name: AvailableAgentNames, value: number) => void;
}

const Concentration: React.FC<AgentProps> = ({ agents, onChange }) => {
    return map(agents, (concentration, agent: AvailableAgentNames) => {
        return (
            <Slider
                min={1}
                max={20}
                name={agent}
                initialValue={concentration}
                onChange={onChange}
                key={agent}
            />
        );
    });
};

export default Concentration;
