import React, { useContext, useState } from "react";
import { map } from "lodash";
import { Flex } from "antd";

import {
    AgentName,
    CurrentConcentration,
    InputConcentration,
} from "../../types";
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
    onChangeComplete?: (name: string, value: number) => void;
    liveConcentration: CurrentConcentration;
}

const Concentration: React.FC<AgentProps> = ({
    concentration,
    onChange,
    adjustableAgent,
    liveConcentration,
    onChangeComplete,
}) => {
    const { isPlaying, maxConcentration, page, getAgentColor } =
        useContext(SimulariumContext);
    const [width, setWidth] = useState<number>(0);
    const getComponent = (
        agent: AgentName,
        currentConcentrationOfAgent: number
    ) => {
        if (adjustableAgent === agent && !isPlaying && page !== 2) {
            return (
                <ConcentrationSlider
                    min={0}
                    max={maxConcentration}
                    name={agent}
                    initialValue={concentration[agent] || 0}
                    onChange={onChange}
                    onChangeComplete={onChangeComplete}
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
                    (agentLiveConcentration: number, agent: AgentName) => {
                        return (
                            <Flex
                                className={styles.concentration}
                                vertical
                                key={agent}
                            >
                                <span
                                    className={styles.agentName}
                                    style={{
                                        color: getAgentColor(agent),
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
