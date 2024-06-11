import { useContext } from "react";
import { AnalysisContext } from "../context/context";
import { SecondaryButton } from "./shared/ButtonLibrary";
import ProgressionControl from "./shared/ProgressionControl";

const RecordEquilibriumButton = () => {
    const { handleRecordEquilibrium } = useContext(AnalysisContext);
    return (
        <ProgressionControl onPage={[3, 6]}>
            <SecondaryButton
                onClick={handleRecordEquilibrium}
                style={{ maxWidth: 236, width: "100%" }}
            >
                Record
            </SecondaryButton>
        </ProgressionControl>
    );
};

export default RecordEquilibriumButton;
