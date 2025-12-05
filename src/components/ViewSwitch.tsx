import React, { useContext } from "react";

import Viewer from "./Viewer";
import { SimulariumContext } from "../simulation/context";
import ProgressionControl from "./shared/ProgressionControl";
import PlayButton from "./PlayButton";
import { OverlayButton } from "./shared/ButtonLibrary";
import LabIcon from "./icons/Lab";
import Molecules from "./icons/Molecules";
import LabView from "./LabView";
import VisibilityControl from "./shared/VisibilityControl";
import { Module, ViewType } from "../types";
import { FIRST_PAGE } from "../content";
import { VIEW_SWITCH_ID } from "../constants";

const ViewSwitch: React.FC = () => {
    const { viewportType, setViewportType } = useContext(SimulariumContext);

    const { page, isPlaying, setIsPlaying, handleTimeChange, module } =
        useContext(SimulariumContext);

    const isFirstPageOfFirstModule =
        page === FIRST_PAGE[module] + 1 && module === Module.A_B_AB;

    let buttonStyle: React.CSSProperties = {
        top: 16,
        right: 16,
        // by default, antd animates everything, and this button moves, so we're only animating
        // the hover color change and not the position change
        transition:
            "background 0.2s, color 0.2s, border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)",
    };

    // on the first page of the first module, the button is centered, but otherwise it's on the right
    if (isFirstPageOfFirstModule) {
        buttonStyle = {
            ...buttonStyle,
            right: "50%",
            transform: "translateX(50%)",
        };
    }

    return (
        <div style={{ position: "relative", height: "100%" }}>
            <VisibilityControl notInBonusMaterial>
                <ProgressionControl elementId={VIEW_SWITCH_ID}>
                    <OverlayButton
                        onClick={setViewportType}
                        style={buttonStyle}
                        icon={
                            viewportType === ViewType.Lab ? (
                                <Molecules />
                            ) : (
                                <LabIcon />
                            )
                        }
                    >
                        {viewportType === ViewType.Lab ? "Molecular" : "Lab"}{" "}
                        view
                    </OverlayButton>
                </ProgressionControl>
            </VisibilityControl>
            <PlayButton />
            {viewportType === ViewType.Lab ? <LabView /> : null}
            <Viewer
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                handleTimeChange={handleTimeChange}
            />
        </div>
    );
};

export default ViewSwitch;
