import React, { useContext } from "react";

import { SimulariumContext } from "../simulation/context";
import ProgressionControl from "./shared/ProgressionControl";
import VisibilityControl from "./shared/VisibilityControl";
import { OverlayButton } from "./shared/Buttons";

const PlayButton: React.FC = () => {
    const { isPlaying, setIsPlaying } = useContext(SimulariumContext);

    const handleClick = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <VisibilityControl excludedPages={[1]}>
            <ProgressionControl onPage={[2, 5]}>
                <OverlayButton onClick={handleClick} style={{ bottom: 0 }}>
                    {isPlaying ? "Pause" : "Play"}
                </OverlayButton>
            </ProgressionControl>
        </VisibilityControl>
    );
};

export default PlayButton;
