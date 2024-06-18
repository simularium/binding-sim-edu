import { useContext } from "react";
import { AppContext } from "../../context";
import { PrimaryButton } from "./ButtonLibrary";

const NextButton = () => {
    const { page, setPage } = useContext(AppContext);

    return (
        <PrimaryButton onClick={() => setPage(page + 1)}>Next</PrimaryButton>
    );
};

export default NextButton;
