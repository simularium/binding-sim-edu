import React, { useContext } from "react";
import classNames from "classnames";

import styles from "./scalebar.module.css";
import { MICRO } from "../constants";
import { SimulariumContext } from "../simulation/context";

interface ScaleBarProps {
    productColor: string;
    className?: string;
}

const ScaleBar: React.FC<ScaleBarProps> = ({ productColor, className }) => {
    const { maxConcentration } = useContext(SimulariumContext);
    const labelArray = [];
    const interval = maxConcentration / 5;
    for (let i = maxConcentration; i >= 0; i = i - interval) {
        labelArray.push(i);
    }
    return (
        <div
            className={classNames(styles.container, className)}
            role="img"
            aria-label={`Color key for the cuvette. The lowest concentration (white) is 0 ${MICRO}M and the highest concentration (yellow) is ${maxConcentration} ${MICRO}M.`}
        >
            <div className={styles.labels}>
                {labelArray.map((i) => (
                    <div key={i}>
                        {i} {MICRO}M -{" "}
                    </div>
                ))}
            </div>
            <div
                style={{
                    background: `linear-gradient(0deg, #ffffff 0%, ${productColor} 100%)`,
                }}
                className={styles.scaleBar}
            ></div>
        </div>
    );
};

export default ScaleBar;
