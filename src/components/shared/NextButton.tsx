import { useContext } from "react";
import { SimulariumContext } from "../../simulation/context";
import { PrimaryButton } from "./ButtonLibrary";

interface NextButtonProps {
    isFinish?: boolean;
}

const NextButton = ({ isFinish }: NextButtonProps) => {
    const { page, setPage } = useContext(SimulariumContext);

    return (
        <PrimaryButton onClick={() => setPage(page + 1)}>
            {isFinish ? "Finish" : "Next"}
        </PrimaryButton>
    );
};

export default NextButton;
