import React, { useContext } from "react";
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";

import { SimulariumContext } from "../simulation/context";
import ProgressionControl from "./shared/ProgressionControl";
import VisibilityControl from "./shared/VisibilityControl";
import { OverlayButton } from "./shared/ButtonLibrary";

const PlayButton: React.FC = () => {
    const { isPlaying, setIsPlaying } = useContext(SimulariumContext);

    const handleClick = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <VisibilityControl excludedPages={[1, 10, 11]}>
            <ProgressionControl onPage={[2, 5]}>
                <OverlayButton
                    onClick={handleClick}
                    style={{ top: 14, left: 16 }}
                    icon={
                        isPlaying ? <PauseOutlined /> : <CaretRightOutlined />
                    }
                />
            </ProgressionControl>
        </VisibilityControl>
    );
};

export default PlayButton;
