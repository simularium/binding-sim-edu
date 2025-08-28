import { RECORD_BUTTON_ID } from "../constants";
import { PillButton } from "./shared/ButtonLibrary";
import ProgressionControl from "./shared/ProgressionControl";

interface RecordEquilibriumButtonProps {
    handleRecordEquilibrium: () => void;
}

const RecordEquilibriumButton = ({
    handleRecordEquilibrium,
}: RecordEquilibriumButtonProps) => {
    return (
        <ProgressionControl elementId={RECORD_BUTTON_ID}>
            <PillButton onClick={handleRecordEquilibrium}>Record</PillButton>
        </ProgressionControl>
    );
};

export default RecordEquilibriumButton;
