import React from "react";
import Slider from "./Slider";
import { map } from "lodash";
import { AvailableAgentNames } from "../types";

interface AgentProps {
    activeAgents: AvailableAgentNames[];
    concentration: { [key in AvailableAgentNames]: number };
    onChange: (name: string, value: number) => void;
}

const Concentration: React.FC<AgentProps> = ({ concentration, onChange, activeAgents }) => {
    return map(concentration, (concentration, agent: AvailableAgentNames) => {
        if (!activeAgents.includes(agent)) {
            return null;
        }
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
