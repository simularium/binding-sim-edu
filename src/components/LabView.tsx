import Rainbow from "rainbowvis.js";
import { useContext, useMemo } from "react";
import { AGENT_AB_COLOR } from "../constants/colors";
import { SimulariumContext } from "../context";
import Cuvette from "./icons/Cuvette";
import styles from "./labview.module.css";

interface LabViewProps {
    currentProductConcentration: number;
}

const LabView: React.FC<LabViewProps> = ({ currentProductConcentration }) => {
    const { maxConcentration } = useContext(SimulariumContext);
    const colorGradient = useMemo(() => {
        const rainbow = new Rainbow();
        rainbow.setSpectrum("#FFFFFF", AGENT_AB_COLOR);
        return rainbow;
    }, []);
    const position = (currentProductConcentration / maxConcentration) * 100;
    return (
        <div className={styles.container}>
            <div className={styles.cuvette}>
                <Cuvette color={colorGradient.colorAt(position)} />
            </div>
        </div>
    );
};

export default LabView;
