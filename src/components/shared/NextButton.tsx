import { useContext } from "react";
import { SimulariumContext } from "../../simulation/context";
import { PrimaryButton } from "./ButtonLibrary";
import useModule from "../../hooks/useModule";

interface NextButtonProps {
    text?: string;
}

const NextButton = ({ text }: NextButtonProps) => {
    const { page, setPage, module, setModule } = useContext(SimulariumContext);

    const { totalPages } = useModule(module);
    if (page + 1 > totalPages) {
        return (
            <PrimaryButton onClick={() => setModule(module + 1)}>
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
