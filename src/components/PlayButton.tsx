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

    const iconStyle = { fontSize: 26 };

    return (
        <VisibilityControl excludedPages={[1]}>
            <ProgressionControl onPage={[2, 6]}>
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
