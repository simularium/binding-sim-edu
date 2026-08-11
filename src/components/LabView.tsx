import Rainbow from "rainbowvis.js";
import { useMemo } from "react";
import {
    useSimulariumSimulation,
    useSimulariumUi,
} from "../hooks/useSimulationContext";
import Cuvette from "./icons/Cuvette";
import styles from "./labview.module.css";
import classNames from "classnames";
import ScaleBar from "./ScaleBar";
import { Module } from "../types";

const LabView: React.FC = () => {
    const {
        currentProductionConcentration,
        maxConcentration,
        getAgentColor,
        productName,
    } = useSimulariumSimulation();
    const { page, module, setViewportType } = useSimulariumUi();
    const color = getAgentColor(productName);
    const colorGradient = useMemo(() => {
        const rainbow = new Rainbow();
        rainbow.setSpectrum("#FFFFFF", color);
        return rainbow;
    }, [color]);
    const position = (currentProductionConcentration / maxConcentration) * 100;
    const isIntroPage = page === 1 && module === Module.A_B_AB;

    if (isIntroPage) {
        // shows the full screen illustrated cuvette on the first page of the first module
        return (
            <div className={classNames(styles.container, styles.top)}>
                <div className={styles.cuvette}>
                    <Cuvette color={colorGradient.colorAt(position)} />
                </div>
            </div>
        );
    } else {
        return (
            <div className={styles.inset}>
                <div className={styles.insetLabel}>
                    <span>In the wet lab</span>
                    <button
                        className={styles.insetClose}
                        onClick={setViewportType}
                        aria-label="Close lab view"
                    >
                        ×
                    </button>
                </div>
                <div className={styles.insetBody}>
                    <ScaleBar
                        productColor={color}
                        className={styles.scaleBarInset}
                    />
                    <div className={styles.insetCuvette}>
                        <Cuvette color={colorGradient.colorAt(position)} />
                    </div>
                </div>
            </div>
        );
    }
};

export default LabView;
