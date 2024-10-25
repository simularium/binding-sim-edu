import React, { useContext } from "react";
import { SimulariumContext } from "../simulation/context";
import { TertiaryButton } from "./shared/ButtonLibrary";

const StartExperiment: React.FC = () => {
    const { handleStartExperiment } = useContext(SimulariumContext);
    return (
        <TertiaryButton ghost onClick={handleStartExperiment}>
            Start Experiment
        </TertiaryButton>
    );
};

export default StartExperiment;
