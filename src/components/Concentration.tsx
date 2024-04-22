import React, { useContext, useEffect, useRef, useState } from "react";
import { map } from "lodash";
import { Flex } from "antd";

import ConcentrationSlider from "./shared/ConcentrationSlider";
import {
    AvailableAgentNames,
    CurrentConcentration,
    InputConcentration,
} from "../types";
import { AGENT_AND_PRODUCT_COLORS } from "../simulation/trajectories-settings";
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

    const [width, setWidth] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setWidth(containerRef.current?.offsetWidth || 0);
    }, [containerRef.current?.offsetWidth, width]);

    const getComponent = (
        agent: AvailableAgentNames,
        currentConcentrationOfAgent: number
    ) => {
        if (adjustableAgent === agent && !isPlaying) {
            return (
                <ConcentrationSlider
                    min={0}
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
                    width={width}
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
                                <Flex
                                    gap={16}
                                    style={{ width: "100%" }}
                                    ref={containerRef}
                                >
                                    {getComponent(
                                        agent,
                                        agentLiveConcentration
                                    )}
                                    <span className={styles.unit}>μM</span>
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
