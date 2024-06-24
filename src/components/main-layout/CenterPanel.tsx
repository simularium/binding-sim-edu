import React from "react";
import ViewSwitch from "../ViewSwitch";
import EquilibriumQuestion from "../quiz-questions/EquilibriumQuestion";
import KdQuestion from "../quiz-questions/KdQuestion";
import { Module } from "../../types";

import styles from "./layout.module.css";

interface CenterPanelProps {
    reactionType: Module;
}
export const CenterPanelContext = React.createContext<{
    numberOpen: number;
    setNumberOpen: React.Dispatch<React.SetStateAction<number>>;
    lastOpened: string;
    setLastOpened: React.Dispatch<React.SetStateAction<string>>;
}>({
    numberOpen: 0,
    setNumberOpen: () => {},
    lastOpened: "",
    setLastOpened: () => {},
});
const CenterPanel: React.FC<CenterPanelProps> = ({ reactionType }) => {
    const [numberOpen, setNumberOpen] = React.useState<number>(0);
    const [lastOpened, setLastOpened] = React.useState<string>("");
    return (
        <>
            <ViewSwitch />
            <CenterPanelContext.Provider
                value={{ numberOpen, setNumberOpen, lastOpened, setLastOpened }}
            >
                <div className={styles.questionContainer}>
                    <EquilibriumQuestion />
                    <KdQuestion reactionType={reactionType} />
                </div>
            </CenterPanelContext.Provider>
        </>
    );
};

export default CenterPanel;
