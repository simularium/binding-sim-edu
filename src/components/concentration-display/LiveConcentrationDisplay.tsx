import { Flex, Progress } from "antd";
import React, { useContext } from "react";
import { AgentName } from "../../types";

import styles from "./live-concentration-display.module.css";
import { SimulariumContext } from "../../simulation/context";

interface LiveConcentrationDisplayProps {
    concentration: number;
    agent: AgentName;
    width: number;
}

const LiveConcentrationDisplay: React.FC<LiveConcentrationDisplayProps> = ({
    agent,
    concentration,
    width,
}) => {
    const { maxConcentration, getAgentColor } = useContext(SimulariumContext);
    // the steps have a 2px gap, so we are adjusting the
    // size of the step based on the total number we want
    const steps = Math.max(maxConcentration, 10);
    const size = width / steps - 2;
    return (
        <div className={styles.container}>
            <Progress
                className={styles.progressBar}
                percent={Math.ceil((concentration / maxConcentration) * 100)}
                key={agent}
                steps={steps}
                showInfo={false}
                strokeColor={getAgentColor(agent)}
                style={{ width }}
                size={[size, 4]}
            />
            <Flex justify="space-between" className={styles.labels}>
                <span className={styles.numberLabel}>0</span>
                <span className={styles.numberLabel}>{maxConcentration}</span>
            </Flex>
        </div>
    );
};

export default LiveConcentrationDisplay;
