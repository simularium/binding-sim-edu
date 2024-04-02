import React, { useContext } from "react";

import { SimulariumContext } from "../simulation/context";
import ProgressionControl from "./shared/ProgressionControl";
import VisibilityControl from "./shared/VisibilityControl";
import Button from "./shared/Button";

const PlayButton: React.FC = () => {
    const { isPlaying, setIsPlaying } = useContext(SimulariumContext);

    const handleClick = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <VisibilityControl excludedPages={[1]}>
            <ProgressionControl onPage={[2, 5]}>
                <Button
                    onClick={handleClick}
                    type="primary"
                    ghost
                    style={{ position: "absolute", zIndex: 3001, bottom: 0}}
                >
                    {isPlaying ? "Pause" : "Play"}
                </Button>
            </ProgressionControl>
        </VisibilityControl>
    );
};

export default PlayButton;
