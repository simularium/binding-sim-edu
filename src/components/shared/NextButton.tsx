import { useContext } from "react";
import { SimulariumContext } from "../../simulation/context";
import { PrimaryButton } from "./ButtonLibrary";

interface NextButtonProps {
    text?: string;
}

const NextButton = ({ text }: NextButtonProps) => {
    const { page, setPage } = useContext(SimulariumContext);

    return (
        <PrimaryButton onClick={() => setPage(page + 1)}>
            {text || "Next"}
        </PrimaryButton>
    );
};

export default NextButton;
