import React, { useContext, useState } from "react";
import { map } from "lodash";
import { Flex } from "antd";

import { AgentName, InputConcentration } from "../../types";
import {
    AppContext,
    LiveEventsContext,
    SimulariumContext,
} from "../../context/context";
import styles from "./concentration.module.css";
import LiveConcentrationDisplay from "./LiveConcentrationDisplay";
import ConcentrationSlider from "./ConcentrationSlider";
import { MICRO } from "../../constants";
import ResizeContainer from "../shared/ResizeContainer";

interface AgentProps {
    adjustableAgent: AgentName;
    concentration: InputConcentration;
}

const Concentration: React.FC<AgentProps> = ({
    concentration,
    adjustableAgent,
}) => {
    const { page } = useContext(AppContext);
    const { isPlaying, maxConcentration, getAgentColor } =
        useContext(SimulariumContext);
    const {
        liveConcentration,
        handleNewInputConcentration,
        handleFinishInputConcentrationChange,
    } = useContext(LiveEventsContext);

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
                    onChange={handleNewInputConcentration}
                    onChangeComplete={handleFinishInputConcentrationChange}
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
