import { SecondaryButton } from "./shared/ButtonLibrary";
import ProgressionControl from "./shared/ProgressionControl";

interface RecordEquilibriumButtonProps {
    handleRecordEquilibrium: () => void;
}

const RecordEquilibriumButton = ({
    handleRecordEquilibrium,
}: RecordEquilibriumButtonProps) => {
    return (
        <ProgressionControl onPage={[3, 6]}>
            <SecondaryButton onClick={handleRecordEquilibrium} style={{width: "100%"}}>
                Record
            </SecondaryButton>
        </ProgressionControl>
    );
};

export default RecordEquilibriumButton;
