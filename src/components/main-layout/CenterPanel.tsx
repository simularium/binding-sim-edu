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
    canDetermineEquilibrium: boolean;
}

export const CenterPanelContext = React.createContext<{
    lastOpened: string | null;
    setLastOpened: React.Dispatch<React.SetStateAction<string | null>>;
}>({
    lastOpened: "",
    setLastOpened: () => {},
});
const CenterPanel: React.FC<CenterPanelProps> = ({
    reactionType,
    canDetermineEquilibrium,
}) => {
    const [lastOpened, setLastOpened] = React.useState<string | null>(null);
    return (
        <>
            <ViewSwitch />
            <CenterPanelContext.Provider value={{ lastOpened, setLastOpened }}>
                <div className={styles.questionContainer}>
                    <EquilibriumQuestion />
                    <KdQuestion
                        reactionType={reactionType}
                        canAnswer={canDetermineEquilibrium}
                    />
                </div>
            </CenterPanelContext.Provider>
            <VisibilityControl includedPages={[9]}>
                <FinalPage />
            </VisibilityControl>
        </>
    );
};

export default CenterPanel;
