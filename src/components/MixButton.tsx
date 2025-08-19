import React, { useContext } from "react";

import { SimulariumContext } from "../simulation/context";
import ProgressionControl from "./shared/ProgressionControl";
import VisibilityControl from "./shared/VisibilityControl";
import { OverlayButton } from "./shared/ButtonLibrary";
import { Module } from "../types";

const MixButton: React.FC = () => {
    const { handleMixAgents } = useContext(SimulariumContext);

    const handleClick = () => {
        handleMixAgents();
    };

    return (
        <VisibilityControl excludedPages={{ [Module.A_B_AB]: [1] }}>
            <ProgressionControl
                onPage={{
                    [Module.A_B_AB]: [2, 6],
                }}
            >
                <OverlayButton
                    onClick={handleClick}
                    style={{ top: 14, left: 60 }}
                    // icon={
                    //     isPlaying ? (
                    //         <PauseOutlined style={iconStyle} />
                    //     ) : (
                    //         <CaretRightOutlined style={iconStyle} />
                    //     )
                    // }
                />
            </ProgressionControl>
        </VisibilityControl>
    );
};

export default MixButton;
