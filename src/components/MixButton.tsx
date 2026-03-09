import React, { useContext } from "react";

import { SimulariumSimulationContext } from "../simulation/context";
import { TertiaryButton } from "./shared/ButtonLibrary";
import { MIX_AGENTS_ID } from "../constants";
import ProgressionControl from "./shared/ProgressionControl";
import style from "./start-experiment.module.css";

const MixButton: React.FC = () => {
    const { handleMixAgents } = useContext(SimulariumSimulationContext);

    return (
        <ProgressionControl elementId={MIX_AGENTS_ID}>
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
