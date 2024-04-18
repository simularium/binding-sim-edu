import React from "react";
import { map } from "lodash";

import Slider from "./shared/Slider";
import { AvailableAgentNames } from "../types";

interface AgentProps {
    activeAgents: AvailableAgentNames[];
    adjustableAgent: AvailableAgentNames;
    concentration: { [key in AvailableAgentNames]: number };
    onChange: (name: string, value: number) => void;
    disabled: boolean;
    liveConcentration: { [key in AvailableAgentNames]: number };
}

const Concentration: React.FC<AgentProps> = ({
    concentration,
    onChange,
    activeAgents,
    disabled,
    adjustableAgent,
    liveConcentration,
}) => {
    if (disabled) {
        return (
            <div>
                {map(
                    liveConcentration,
                    (concentration, agent: AvailableAgentNames) => {
                        return (
                            <div key={agent}>
                                {agent}: {concentration}
                            </div>
                        );
                    }
                )}
            </div>
        );
    } else {
        return map(
            concentration,
            (concentration, agent: AvailableAgentNames) => {
                if (!activeAgents.includes(agent)) {
                    return null;
                }

                return (
                    <Slider
                        min={2}
                        max={20}
                        name={agent}
                        initialValue={concentration}
                        onChange={onChange}
                        key={agent}
                        disabled={disabled || agent !== adjustableAgent}
                    />
                );
            }
        );
    }
};

export default Concentration;
