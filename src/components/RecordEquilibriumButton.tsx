import { RECORD_BUTTON_ID } from "../constants";
import { SimulariumContext } from "../simulation/context";
import { PillButton } from "./shared/ButtonLibrary";
import ProgressionControl from "./shared/ProgressionControl";
import { useContext } from "react";

interface RecordEquilibriumButtonProps {
    handleRecordEquilibrium: () => void;
}

const RecordEquilibriumButton = ({
    handleRecordEquilibrium,
}: RecordEquilibriumButtonProps) => {
    const id = RECORD_BUTTON_ID;
    const { progressionElement } = useContext(SimulariumContext);

    return (
        <ProgressionControl onPage={progressionElement === id}>
            <PillButton onClick={handleRecordEquilibrium}>Record</PillButton>
        </ProgressionControl>
    );
};

export default RecordEquilibriumButton;
