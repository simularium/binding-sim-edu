import React, { useContext } from "react";

import { SimulariumContext } from "../simulation/context";
import { TertiaryButton } from "./shared/ButtonLibrary";
import style from "./start-experiment.module.css";

const MixButton: React.FC = () => {
    const { handleMixAgents } = useContext(SimulariumContext);

    const handleClick = () => {
        handleMixAgents();
    };

    return (
        <TertiaryButton
            ghost
            onClick={handleClick}
            style={{ top: 14, left: 60 }}
            className={style.container}
        >
            Randomize positions
        </TertiaryButton>
    );
};

export default MixButton;
