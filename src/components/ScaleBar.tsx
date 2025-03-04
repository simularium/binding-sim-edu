import React, { useContext } from "react";

import styles from "./scalebar.module.css";
import { MICRO } from "../constants";
import { SimulariumContext } from "../simulation/context";

interface ScaleBarProps {
    productColor: string;
}

const ScaleBar: React.FC<ScaleBarProps> = ({ productColor }) => {
    const { maxConcentration } = useContext(SimulariumContext);
    const labelArray = [];
    for (let i = maxConcentration; i >= 0; i = i - 2) {
        labelArray.push(i);
    }
    return (
        <div
            className={styles.container}
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
                // inlined this style because the agent color is in javascript
                // and I want to avoid defining it in both places
                style={{
                    background: `linear-gradient(0deg, #ffffff 0%, ${productColor} 100%)`,
                }}
                className={styles.scaleBar}
            ></div>
        </div>
    );
};

export default ScaleBar;
