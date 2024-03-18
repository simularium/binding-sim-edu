import React from "react";
import Slider from "./Slider";
import { map } from "lodash";
import { AvailableAgentNames } from "../types";
import ProgressionControl from "./ProgressionControl";

interface AgentProps {
    activeAgents: AvailableAgentNames[];
    concentration: { [key in AvailableAgentNames]: number };
    onChange: (name: string, value: number) => void;
    disabled: boolean;
}

const Concentration: React.FC<AgentProps> = ({
    concentration,
    onChange,
    activeAgents,
    disabled,
}) => {
    return map(concentration, (concentration, agent: AvailableAgentNames) => {
        if (!activeAgents.includes(agent)) {
            return null;
        }
        return (
            <ProgressionControl onPage={5} key={agent}>
                <Slider
                    min={1}
                    max={20}
                    name={agent}
                    initialValue={concentration}
                    onChange={onChange}
                    key={agent}
                    disabled={disabled}
                />
            </ProgressionControl>
        );
    });
};

export default Concentration;
