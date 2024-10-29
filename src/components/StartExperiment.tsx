import React, { useContext } from "react";
import classNames from "classnames";

import { SimulariumContext } from "../simulation/context";
import { TertiaryButton } from "./shared/ButtonLibrary";

import style from "./start-experiment.module.css";

const StartExperiment: React.FC = () => {
    const { handleStartExperiment } = useContext(SimulariumContext);
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
