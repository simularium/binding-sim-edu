import Rainbow from "rainbowvis.js";
import { useContext, useMemo } from "react";
import { SimulariumContext } from "../simulation/context";
import Cuvette from "./icons/Cuvette";
import styles from "./labview.module.css";
import classNames from "classnames";
import ScaleBar from "./ScaleBar";
import { Module } from "../types";

const LabView: React.FC = () => {
    const {
        currentProductionConcentration,
        maxConcentration,
        page,
        getAgentColor,
        productName,
        module,
        setViewportType,
    } = useContext(SimulariumContext);
    const color = getAgentColor(productName);
    const colorGradient = useMemo(() => {
        const rainbow = new Rainbow();
        rainbow.setSpectrum("#FFFFFF", color);
        return rainbow;
    }, [color]);
    const position = (currentProductionConcentration / maxConcentration) * 100;
    const isIntroPage = page === 1 && module === Module.A_B_AB;

    if (!isIntroPage) {
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

    return (
        <div className={classNames(styles.container, styles.top)}>
            <div className={styles.cuvette}>
                <Cuvette color={colorGradient.colorAt(position)} />
            </div>
        </div>
    );
};

export default LabView;
