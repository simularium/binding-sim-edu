import React, { useContext } from "react";

import styles from "./scalebar.module.css";
import { MICRO } from "../constants";
import { SimulariumContext } from "../simulation/context";
import { AGENT_AB_COLOR } from "../constants/colors";

const ScaleBar: React.FC = () => {
    const { maxConcentration } = useContext(SimulariumContext);
    const labelArray = [];
    for (let i = maxConcentration; i >= 0; i = i - 2) {
        labelArray.push(i);
    }
    return (
        <div className={styles.container}>
            <div className={styles.labels}>
                {labelArray.map((i) => (
                    <div key={i} className={styles.label}>
                        {i} {MICRO}M -{" "}
                    </div>
                ))}
            </div>
            <div
                // inlined this style because the agent color is in javascript
                // and I want to avoid defining it in both places
                style={{
                    background: `linear-gradient(0deg, #ffffff 0%, ${AGENT_AB_COLOR} 100%)`,
                }}
                className={styles.scaleBar}
            ></div>
        </div>
    );
};

export default ScaleBar;
