import { PillButton } from "./shared/ButtonLibrary";
import ProgressionControl from "./shared/ProgressionControl";

interface RecordEquilibriumButtonProps {
    handleRecordEquilibrium: () => void;
}
const FIRST_RECORD_PAGE = 7;
const SECOND_RECORD_PAGE = 9;
const RecordEquilibriumButton = ({
    handleRecordEquilibrium,
}: RecordEquilibriumButtonProps) => {
    return (
        <ProgressionControl onPage={[FIRST_RECORD_PAGE, SECOND_RECORD_PAGE]}>
            <PillButton onClick={handleRecordEquilibrium}>Record</PillButton>
        </ProgressionControl>
    );
};

export default RecordEquilibriumButton;
