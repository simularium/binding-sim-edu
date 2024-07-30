import React, { useContext, useState } from "react";

import Viewer from "./Viewer";
import { SimulariumContext } from "../simulation/context";
import ProgressionControl from "./shared/ProgressionControl";
import PlayButton from "./PlayButton";
import { OverlayButton } from "./shared/ButtonLibrary";
import LabIcon from "./icons/Lab";
import Molecules from "./icons/Molecules";
import LabView from "./LabView";
import usePageNumber from "../hooks/usePageNumber";

enum View {
    Lab = "lab",
    Simulation = "simulation",
}

interface ViewSwitchProps {
    hasProgressed: boolean;
}

const ViewSwitch: React.FC<ViewSwitchProps> = ({ hasProgressed }) => {
    const [currentView, setCurrentView] = useState<View>(View.Lab);

    const switchView = () => {
        setCurrentView((prevView) =>
            prevView === View.Lab ? View.Simulation : View.Lab
        );
    };
    const { page, isPlaying, setIsPlaying, handleTimeChange } =
        useContext(SimulariumContext);

    usePageNumber(
        page,
        (page) => page === 1 && hasProgressed,
        () => {
            setCurrentView(View.Lab);
        }
    );

    let buttonStyle = {
        top: 16,
        left: 16,
        // by default, antd animates everything, and this button moves, so we're only animating
        // the hover color change and not the position change
        transition:
            "background 0.2s, color 0.2s, border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)",
    };

    if (page === 1) {
        const siderWidth = window.innerWidth * 0.25;
        buttonStyle = { ...buttonStyle, left: -siderWidth + 16 };
    }

    return (
        <div style={{ position: "relative", height: "100%" }}>
            <ProgressionControl onPage={1}>
                <OverlayButton
                    onClick={switchView}
                    style={buttonStyle}
                    icon={
                        currentView === View.Lab ? <Molecules /> : <LabIcon />
                    }
                >
                    Switch to {currentView === View.Lab ? "molecular" : "lab"}{" "}
                    view
                </OverlayButton>
            </ProgressionControl>
            <PlayButton />
            {currentView === View.Lab ? <LabView /> : null}
            <Viewer
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                handleTimeChange={handleTimeChange}
            />
        </div>
    );
};

export default ViewSwitch;
