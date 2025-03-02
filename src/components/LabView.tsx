import Rainbow from "rainbowvis.js";
import { useContext, useMemo } from "react";
import { AGENT_AB_COLOR } from "../constants/colors";
import { SimulariumContext } from "../simulation/context";
import Cuvette from "./icons/Cuvette";
import styles from "./labview.module.css";
import classNames from "classnames";
import ScaleBar from "./ScaleBar";
import VisibilityControl from "./shared/VisibilityControl";
import { Module } from "../types";

const LabView: React.FC = () => {
    const { currentProductionConcentration, maxConcentration, page } =
        useContext(SimulariumContext);
    const colorGradient = useMemo(() => {
        const rainbow = new Rainbow();
        rainbow.setSpectrum("#FFFFFF", AGENT_AB_COLOR);
        return rainbow;
    }, []);
    const position = (currentProductionConcentration / maxConcentration) * 100;
    return (
        <div
            className={classNames([
                styles.container,
                { [styles.top]: page === 1 },
            ])}
        >
            <VisibilityControl excludedPages={{ [Module.A_B_AB]: [1] }}>
                <ScaleBar />
            </VisibilityControl>
            <div className={styles.cuvette}>
                <Cuvette color={colorGradient.colorAt(position)} />
            </div>
        </div>
    );
};

export default LabView;
