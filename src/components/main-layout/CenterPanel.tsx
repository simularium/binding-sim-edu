import React from "react";
import ViewSwitch from "../ViewSwitch";
import EquilibriumQuestion from "../quiz-questions/EquilibriumQuestion";
import KdQuestion from "../quiz-questions/KdQuestion";
import { Module } from "../../types";
import FinalPage from "../FinalPage";
import VisibilityControl from "../shared/VisibilityControl";

import styles from "./layout.module.css";

interface CenterPanelProps {
    reactionType: Module;
}

export const CenterPanelContext = React.createContext<{
    lastOpened: string | null;
    setLastOpened: React.Dispatch<React.SetStateAction<string | null>>;
}>({
    lastOpened: "",
    setLastOpened: () => {},
});
const CenterPanel: React.FC<CenterPanelProps> = ({ reactionType }) => {
    const [lastOpened, setLastOpened] = React.useState<string | null>(null);
    return (
        <>
            <ViewSwitch />
            <CenterPanelContext.Provider value={{ lastOpened, setLastOpened }}>
                <div className={styles.questionContainer}>
                    <EquilibriumQuestion />
                    <KdQuestion reactionType={reactionType} />
                </div>
            </CenterPanelContext.Provider>
            <VisibilityControl includedPages={[10]}>
                <FinalPage />
            </VisibilityControl>
        </>
    );
};

export default CenterPanel;
