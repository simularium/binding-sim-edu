import { Flex, Progress } from "antd";
import React from "react";
import { AGENT_AND_PRODUCT_COLORS } from "../../simulation/trajectories-settings";
import { AvailableAgentNames } from "../../types";

import styles from "./live-concentration-display.module.css";

interface LiveConcentrationDisplayProps {
    concentration: number;
    agent: AvailableAgentNames;
    width: number;
}

const LiveConcentrationDisplay: React.FC<LiveConcentrationDisplayProps> = ({
    agent,
    concentration,
    width,
}) => {
    // width is initially 0
    // on super small screens this can result in a negative number 
    const widthMinusMargins = width - 64.2 > 0?  width - 64.2 : 0;
    // the steps are 14px wide with a 2px gap, so we are adjusting the
    // count based on the width of the container
    const count = Math.floor(widthMinusMargins / 16);
    return (
        <div className={styles.container}>
            <Progress
                className={styles.progressBar}
                percent={Math.ceil((concentration / 20) * 100)}
                key={agent}
                steps={count}
                showInfo={false}
                strokeColor={AGENT_AND_PRODUCT_COLORS[agent]}
                style={{ width: widthMinusMargins }}
            />
            <Flex justify="space-between" className={styles.labels}>
                <span className={styles.numberLabel}>0</span>
                <span className={styles.numberLabel}>20</span>
            </Flex>
        </div>
    );
};

export default LiveConcentrationDisplay;
