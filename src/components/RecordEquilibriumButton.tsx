import { PillButton } from "./shared/ButtonLibrary";
import ProgressionControl from "./shared/ProgressionControl";

interface RecordEquilibriumButtonProps {
    handleRecordEquilibrium: () => void;
}

const RecordEquilibriumButton = ({
    handleRecordEquilibrium,
}: RecordEquilibriumButtonProps) => {
    return (
        <ProgressionControl onPage={[3, 6]}>
            <PillButton onClick={handleRecordEquilibrium}>Record</PillButton>
        </ProgressionControl>
    );
};

export default RecordEquilibriumButton;
