import { PrimaryButton } from "./shared/ButtonLibrary";
import ProgressionControl from "./shared/ProgressionControl";

interface RecordEquilibriumButtonProps {
    handleRecordEquilibrium: () => void;
}

const RecordEquilibriumButton = ({
    handleRecordEquilibrium,
}: RecordEquilibriumButtonProps) => {
    return (
        <ProgressionControl onPage={[3, 6]}>
            <PrimaryButton ghost onClick={handleRecordEquilibrium}>
                Record
            </PrimaryButton>
        </ProgressionControl>
    );
};

export default RecordEquilibriumButton;
