import React, { useContext } from "react";
import { SimulariumContext } from "../simulation/context";
import ProgressionControl from "./ProgressionControl";
import VisibilityControl from "./VisibilityControl";

const PlayButton: React.FC = () => {
    const { isPlaying, setIsPlaying } = useContext(SimulariumContext);

    const handleClick = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <VisibilityControl excludedPages={[1]}>
            <ProgressionControl onPage={[2, 5]}>
                <button onClick={handleClick}>
                    {isPlaying ? "Pause" : "Play"}
                </button>
            </ProgressionControl>
        </VisibilityControl>
    );
};

export default PlayButton;
