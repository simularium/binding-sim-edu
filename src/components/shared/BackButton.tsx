import { useContext } from "react";
import { SimulariumUiContext } from "../../simulation/context";
import { SecondaryButton } from "./ButtonLibrary";

const BackButton = () => {
    const { page, setPage } = useContext(SimulariumUiContext);

    return (
        <SecondaryButton onClick={() => setPage(page - 1)}>
            Back
        </SecondaryButton>
    );
};

export default BackButton;
