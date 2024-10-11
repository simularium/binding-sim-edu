import React, { useContext } from "react";

import styles from "./scalebar.module.css";
import { MICRO } from "../constants";
import { SimulariumContext } from "../simulation/context";

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
            <div className={styles.scaleBar}></div>
        </div>
    );
};

export default ScaleBar;
