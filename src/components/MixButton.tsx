import React, { useContext } from "react";

import { SimulariumContext } from "../simulation/context";
import { TertiaryButton } from "./shared/ButtonLibrary";
import { MIX_AGENTS_ID } from "../constants";
import ProgressionControl from "./shared/ProgressionControl";
import style from "./start-experiment.module.css";

const MixButton: React.FC = () => {
    const id = MIX_AGENTS_ID;
    const { handleMixAgents, progressionElement } =
        useContext(SimulariumContext);

    return (
        <ProgressionControl onPage={progressionElement === id}>
            <TertiaryButton
                ghost
                onClick={handleMixAgents}
                style={{ top: 0, left: 30, width: 200 }}
                className={style.container}
            >
                Randomize positions
            </TertiaryButton>
        </ProgressionControl>
    );
};

export default MixButton;
