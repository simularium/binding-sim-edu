import { useContext } from "react";
import { SimulariumContext } from "../../simulation/context";
import { SecondaryButton } from "./ButtonLibrary";

const BackButton = () => {
    const { page, setPage } = useContext(SimulariumContext);

    return (
        <SecondaryButton onClick={() => setPage(page - 1)}>
            Back
        </SecondaryButton>
    );
};

export default BackButton;
