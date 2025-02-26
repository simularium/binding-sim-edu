import { Module } from "../types";
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
        <ProgressionControl
            onPage={{
                [Module.A_B_AB]: [FIRST_RECORD_PAGE, SECOND_RECORD_PAGE],
                [Module.A_C_AC]: [1],
                [Module.A_B_C_AB_AC]: [],
            }}
        >
            <PillButton onClick={handleRecordEquilibrium}>Record</PillButton>
        </ProgressionControl>
    );
};

export default RecordEquilibriumButton;
