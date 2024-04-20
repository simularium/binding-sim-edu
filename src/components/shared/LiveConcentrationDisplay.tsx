import { Flex, Progress } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { AGENT_AND_PRODUCT_COLORS } from '../../simulation/trajectories-settings';
import { AvailableAgentNames } from '../../types';

import styles from './live-concentration-display.module.css';

interface LiveConcentrationDisplayProps {
    concentration: number;
    agent: AvailableAgentNames;
}

const LiveConcentrationDisplay: React.FC<LiveConcentrationDisplayProps> = ({
    agent,
    concentration,
}) => {
    const [width, setWidth] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setWidth(containerRef.current?.offsetWidth || 0);
    }, [containerRef.current?.offsetWidth, width]);

    // the steps are 14px wide with a 2px gap, so we are adjusting the
    // count based on the width of the container
    const count = Math.floor((width) / 16);
    return (
        <div className={styles.container} ref={containerRef}>
            <Progress
                className={styles.progressBar}
                percent={Math.ceil((concentration / 20) * 100)}
                key={agent}
                steps={count || 0}
                showInfo={false}
                strokeColor={AGENT_AND_PRODUCT_COLORS[agent]}
            />
            <Flex justify="space-between" className={styles.labels}>
                <span className={styles.numberLabel}>0</span>
                <span className={styles.numberLabel}>20</span>
            </Flex>
        </div>
    );
};

export default LiveConcentrationDisplay;