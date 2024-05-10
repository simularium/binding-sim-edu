import React, { useContext, useState } from "react";
import { map } from "lodash";
import { Flex } from "antd";

import {
    AgentName,
    CurrentConcentration,
    InputConcentration,
} from "../../types";
import { AGENT_AND_PRODUCT_COLORS } from "../../simulation/setup";
import { SimulariumContext } from "../../simulation/context";
import styles from "./concentration.module.css";
import LiveConcentrationDisplay from "./LiveConcentrationDisplay";
import ConcentrationSlider from "./ConcentrationSlider";
import { MICRO } from "../../constants";
import ResizeContainer from "../shared/ResizeContainer";

interface AgentProps {
    adjustableAgent: AgentName;
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
    const { isPlaying, maxConcentration } = useContext(SimulariumContext);
    const [width, setWidth] = useState<number>(0);
    const getComponent = (
        agent: AgentName,
        currentConcentrationOfAgent: number
    ) => {
        if (adjustableAgent === agent && !isPlaying) {
            return (
                <ConcentrationSlider
                    min={0}
                    max={maxConcentration}
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
                        agent: AgentName
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
                                <ResizeContainer
                                    className={styles.widthWrapper}
                                    setWidth={setWidth}
                                >
                                    {getComponent(
                                        agent,
                                        agentLiveConcentration
                                    )}
                                    <span className={styles.unit}>
                                        {MICRO}M
                                    </span>
                                </ResizeContainer>
                            </Flex>
                        );
                    }
                )}
            </Flex>
        </>
    );
};

export default Concentration;
