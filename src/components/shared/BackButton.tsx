import { useSimulariumUi } from "../../hooks/useSimulationContext";
import { SecondaryButton } from "./ButtonLibrary";

const BackButton = () => {
    const { page, setPage } = useSimulariumUi();

    return (
        <SecondaryButton onClick={() => setPage(page - 1)}>
            Back
        </SecondaryButton>
    );
};

export default BackButton;
