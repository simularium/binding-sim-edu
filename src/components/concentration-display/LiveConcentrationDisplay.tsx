import { Flex, Progress } from "antd";
import React, { useContext } from "react";
import { AGENT_AND_PRODUCT_COLORS } from "../../simulation/trajectories-settings";
import { AvailableAgentNames } from "../../types";

import styles from "./live-concentration-display.module.css";
import { SimulariumContext } from "../../simulation/context";

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
    const { maxConcentration } = useContext(SimulariumContext);
    const MARGINS = 64.2;
    // on super small screens this can result in a negative number
    const widthMinusMargins = Math.max(width - MARGINS, 0);
    // the steps have a 2px gap, so we are adjusting the
    // size of the step based on the total number we want
    const size = widthMinusMargins / maxConcentration - 2;
    return (
        <div className={styles.container}>
            <Progress
                className={styles.progressBar}
                percent={Math.ceil((concentration / maxConcentration) * 100)}
                key={agent}
                steps={maxConcentration}
                showInfo={false}
                strokeColor={AGENT_AND_PRODUCT_COLORS[agent]}
                style={{ width: widthMinusMargins }}
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