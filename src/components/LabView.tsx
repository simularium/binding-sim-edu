import Rainbow from "rainbowvis.js";
import { useContext } from "react";
import { AGENT_AB_COLOR } from "../constants/colors";
import { SimulariumContext } from "../simulation/context";
import Cuvette from "./icons/Cuvette";
import styles from "./labview.module.css";

const LabView: React.FC = () => {
    const { currentProductionConcentration, maxConcentration } =
        useContext(SimulariumContext);
    const rainbow = new Rainbow();
    rainbow.setSpectrum("#FFFFFF", AGENT_AB_COLOR);
    const position = (currentProductionConcentration / maxConcentration) * 100;
    return (
        <div className={styles.container}>
            <div className={styles.cuvette}>
                <Cuvette color={rainbow.colorAt(position)} />
            </div>
        </div>
    );
};

export default LabView;
