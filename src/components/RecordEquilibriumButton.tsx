import ProgressionControl from "./shared-components/ProgressionControl";

interface RecordEquilibriumButtonProps {
    handleRecordEquilibrium: () => void;
}

const RecordEquilibriumButton = ({
    handleRecordEquilibrium,
}: RecordEquilibriumButtonProps) => {
    return (
        <ProgressionControl onPage={[3, 6]}>
            <button onClick={handleRecordEquilibrium}>Record</button>
        </ProgressionControl>
    );
};

export default RecordEquilibriumButton;
