import React from "react";
import {
    useSimulariumAnalysis,
    useSimulariumUi,
} from "../../hooks/useSimulationContext";
import { SecondaryButton } from "./ButtonLibrary";

interface ResetButtonProps {
    /** If true, resets all state including UI. If false, only resets analysis data */
    resetAll?: boolean;
    children?: React.ReactNode;
}

/**
 * Button that resets either all application state or just analysis state
 * based on the resetAll prop
 */
const ResetButton: React.FC<ResetButtonProps> = ({
    resetAll = false,
    children,
}) => {
    const { resetAllState } = useSimulariumUi();
    const { resetAnalysisState } = useSimulariumAnalysis();

    const handleClick = () => {
        if (resetAll) {
            resetAllState();
        } else {
            resetAnalysisState();
        }
    };

    return (
        <SecondaryButton onClick={handleClick}>
            {children || (resetAll ? "Reset All" : "Clear Data")}
        </SecondaryButton>
    );
};

export default ResetButton;
