import Button from "./shared/Button";
import ProgressionControl from "./shared/ProgressionControl";

interface RecordEquilibriumButtonProps {
    handleRecordEquilibrium: () => void;
}

const RecordEquilibriumButton = ({
    handleRecordEquilibrium,
}: RecordEquilibriumButtonProps) => {
    return (
        <ProgressionControl onPage={[3, 6]}>
            <Button type="primary" ghost onClick={handleRecordEquilibrium}>
                Record
            </Button>
        </ProgressionControl>
    );
};

export default RecordEquilibriumButton;
