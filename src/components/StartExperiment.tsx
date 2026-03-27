import React from "react";
import classNames from "classnames";

import { useSimulariumSimulation } from "../hooks/useSimulationContext";
import { TertiaryButton } from "./shared/ButtonLibrary";

import style from "./start-experiment.module.css";

const StartExperiment: React.FC = () => {
    const { handleStartExperiment } = useSimulariumSimulation();
    const [initial, setIsInitial] = React.useState(true);
    const handleClick = () => {
        if (initial) {
            setIsInitial(false);
            handleStartExperiment();
        }
    };
    return (
        <TertiaryButton
            ghost
            onClick={handleClick}
            className={classNames([
                style.container,
                { [style.complete]: !initial },
            ])}
        >
            Start Experiment
        </TertiaryButton>
    );
};

export default StartExperiment;
