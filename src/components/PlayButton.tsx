import React, { useContext } from "react";
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";

import { SimulariumContext } from "../simulation/context";
import ProgressionControl from "./shared/ProgressionControl";
import VisibilityControl from "./shared/VisibilityControl";
import { OverlayButton } from "./shared/ButtonLibrary";
import { Module } from "../types";
import { PLAY_BUTTON_ID } from "../constants";

const PlayButton: React.FC = () => {
    const id = PLAY_BUTTON_ID;
    const { isPlaying, setIsPlaying, progressionElement } =
        useContext(SimulariumContext);

    const handleClick = () => {
        setIsPlaying(!isPlaying);
    };

    const iconStyle = { fontSize: 26 };

    return (
        <VisibilityControl excludedPages={{ [Module.A_B_AB]: [1] }}>
            <ProgressionControl onPage={progressionElement === id}>
                <OverlayButton
                    onClick={handleClick}
                    style={{ top: 14, left: 16 }}
                    icon={
                        isPlaying ? (
                            <PauseOutlined style={iconStyle} />
                        ) : (
                            <CaretRightOutlined style={iconStyle} />
                        )
                    }
                />
            </ProgressionControl>
        </VisibilityControl>
    );
};

export default PlayButton;
