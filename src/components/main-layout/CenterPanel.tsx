import React from "react";
import ViewSwitch from "../ViewSwitch";
import EquilibriumQuestion from "../quiz-questions/EquilibriumQuestion";
import KdQuestion from "../quiz-questions/KdQuestion";
import KiQuestion from "../quiz-questions/KiQuestion";
import styles from "./layout.module.css";
import { useSimulariumUi } from "../../hooks/useSimulationContext";
import { Module } from "../../types";

interface CenterPanelProps {
    kd: number;
    canDetermineEquilibrium: boolean;
    overlay?: JSX.Element;
}

export const CenterPanelContext = React.createContext<{
    lastOpened: string | null;
    setLastOpened: React.Dispatch<React.SetStateAction<string | null>>;
}>({
    lastOpened: "",
    setLastOpened: () => {},
});

const CenterPanel: React.FC<CenterPanelProps> = ({
    kd,
    canDetermineEquilibrium,
    overlay,
}) => {
    const [lastOpened, setLastOpened] = React.useState<string | null>(null);
    const { module } = useSimulariumUi();
    return (
        <>
            <ViewSwitch />
            <CenterPanelContext.Provider value={{ lastOpened, setLastOpened }}>
                <div className={styles.questionContainer}>
                    <EquilibriumQuestion />
                    {module === Module.A_B_D_AB ? (
                        <KiQuestion ki={kd} canAnswer={canDetermineEquilibrium} />
                    ) : (
                        <KdQuestion kd={kd} canAnswer={canDetermineEquilibrium} />
                    )}
                </div>
            </CenterPanelContext.Provider>
            {overlay && overlay}
        </>
    );
};

export default CenterPanel;
