import React, { useContext, useEffect, useRef, useState } from "react";
import { map, set } from "lodash";
import { Flex, Progress } from "antd";

import Slider from "./shared/Slider";
import { AvailableAgentNames } from "../types";
import { AGENT_AND_PRODUCT_COLORS } from "../constants/trajectories";
import { SimulariumContext } from "../simulation/context";
import styles from "./concentration.module.css";

interface AgentProps {
    adjustableAgent: AvailableAgentNames;
    concentration: { [key in AvailableAgentNames]: number };
    onChange: (name: string, value: number) => void;
    liveConcentration: { [key in AvailableAgentNames]: number };
}

const Concentration: React.FC<AgentProps> = ({
    concentration,
    onChange,
    adjustableAgent,
    liveConcentration,
}) => {
    const [width, setWidth] = useState<number>(0);
    const { isPlaying } = useContext(SimulariumContext);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setWidth(containerRef.current?.offsetWidth || 0);
    }, [containerRef.current?.offsetWidth, width]);

    const count = Math.floor(20/320 * width);

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
                    initialValue={concentration[agent]}
                    onChange={onChange}
                    key={agent}
                />
            );
        } else {
            return (
                <div>
                    <Progress
                        percent={Math.ceil(currentConcentrationOfAgent / 20 * 100)}
                        key={agent}
                        steps={count || 0}
                        showInfo={false}
                        strokeColor={AGENT_AND_PRODUCT_COLORS[agent]}
                    />
                </div>
            );
        }
    };

    return (
        <Flex className={styles.container} vertical ref={containerRef}>
            {map(
                liveConcentration,
                (agentLiveConcentration, agent: AvailableAgentNames) => {
                    return (
                        <Flex className={styles.concentration} vertical>
                            <span
                                style={{
                                    color: AGENT_AND_PRODUCT_COLORS[agent],
                                }}
                            >
                                {agent}
                            </span>
                            {getComponent(agent, agentLiveConcentration)}
                        </Flex>
                    );
                }
            )}
        </Flex>
    );
};

export default Concentration;
