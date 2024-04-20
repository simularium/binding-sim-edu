import React, { useContext } from "react";
import { map } from "lodash";
import { Flex } from "antd";

import Slider from "./shared/Slider";
import {
    AvailableAgentNames,
    CurrentConcentration,
    InputConcentration,
} from "../types";
import { AGENT_AND_PRODUCT_COLORS } from "../constants/trajectories";
import { SimulariumContext } from "../simulation/context";
import styles from "./concentration.module.css";
import LiveConcentrationDisplay from "./shared/LiveConcentrationDisplay";

interface AgentProps {
    adjustableAgent: AvailableAgentNames;
    concentration: InputConcentration;
    onChange: (name: string, value: number) => void;
    liveConcentration: CurrentConcentration;
}

const Concentration: React.FC<AgentProps> = ({
    concentration,
    onChange,
    adjustableAgent,
    liveConcentration,
}) => {
    const { isPlaying } = useContext(SimulariumContext);



    const getComponent = (
        agent: AvailableAgentNames,
        currentConcentrationOfAgent: number
    ) => {
        if (adjustableAgent === agent && !isPlaying) {
            return (
                <Slider
                    min={2}
                    max={20}
                    name={agent}
                    initialValue={concentration[agent] || 0}
                    onChange={onChange}
                    key={agent}
                />
            );
        } else {
            return (
                <LiveConcentrationDisplay
                    agent={agent}
                    concentration={currentConcentrationOfAgent}
                />
            );
        }
    };
    return (
        <>
            <h3>Agent Concentrations</h3>
            <Flex className={styles.container} vertical>
                {map(
                    liveConcentration,
                    (
                        agentLiveConcentration: number,
                        agent: AvailableAgentNames
                    ) => {
                        return (
                            <Flex
                                className={styles.concentration}
                                vertical
                                key={agent}
                            >
                                <span
                                    className={styles.agentName}
                                    style={{
                                        color: AGENT_AND_PRODUCT_COLORS[agent],
                                    }}
                                >
                                    {agent}
                                </span>
                                <Flex  gap={16} style={{width: "100%"}} >
                                    {getComponent(
                                        agent,
                                        agentLiveConcentration
                                    )}
                                    <span style={{margin: 13.5}}>μM</span>
                                </Flex>
                            </Flex>
                        );
                    }
                )}
            </Flex>
        </>
    );
};

export default Concentration;
