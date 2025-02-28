import { useContext } from "react";
import { SimulariumContext } from "../../simulation/context";
import { PrimaryButton } from "./ButtonLibrary";
import { FIRST_PAGE } from "../../content";

interface NextButtonProps {
    text?: string;
}

const NextButton = ({ text }: NextButtonProps) => {
    const { page, setPage, moduleLength, module, setModule, setIsPlaying } =
        useContext(SimulariumContext);
    if (page + 1 >= moduleLength) {
        const goToNextModule = () => {
            setPage(FIRST_PAGE);
            setModule(module + 1);
            setIsPlaying(false);
        };
        return (
            <PrimaryButton onClick={goToNextModule}>
                {text || "Finish"}
            </PrimaryButton>
        );
    }
    return (
        <PrimaryButton onClick={() => setPage(page + 1)}>
            {text || "Next"}
        </PrimaryButton>
    );
};

export default NextButton;
