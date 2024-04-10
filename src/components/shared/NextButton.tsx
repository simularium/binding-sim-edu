import { useContext } from "react";
import { SimulariumContext } from "../../simulation/context";
import { PrimaryButton } from "./Buttons";

const NextButton = () => {
    const { page, setPage } = useContext(SimulariumContext);

    return (
        <PrimaryButton onClick={() => setPage(page + 1)}>Next</PrimaryButton>
    );
};

export default NextButton;
