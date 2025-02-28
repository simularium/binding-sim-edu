import { useContext } from "react";
import { SimulariumContext } from "../../simulation/context";
import { PrimaryButton } from "./ButtonLibrary";
import { FIRST_PAGE } from "../../content";
import useModule from "../../hooks/useModule";

interface NextButtonProps {
    text?: string;
}

const NextButton = ({ text }: NextButtonProps) => {
    const { page, setPage, module, setModule, setIsPlaying } =
        useContext(SimulariumContext);

    const { totalPages } = useModule(module);
    console.log("NextButton", module, page, totalPages);
    if (page + 1 >= totalPages) {
        const goToNextModule = () => {
            console.log("goToNextModule");
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
