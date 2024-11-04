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
import VisibilityControl from "./shared/VisibilityControl";

enum View {
    Lab = "lab",
    Simulation = "simulation",
}

const ViewSwitch: React.FC = () => {
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
        (page) => page === 1 && currentView === View.Simulation,
        () => {
            // reset home
            setCurrentView(View.Lab);
        }
    );

    let buttonStyle: React.CSSProperties = {
        top: 16,
        right: 16,
        // by default, antd animates everything, and this button moves, so we're only animating
        // the hover color change and not the position change
        transition:
            "background 0.2s, color 0.2s, border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)",
    };

    if (page === 1) {
        buttonStyle = {
            ...buttonStyle,
            right: "50%",
            transform: "translateX(50%)",
        };
    }

    return (
        <div style={{ position: "relative", height: "100%" }}>
            <VisibilityControl notInBonusMaterial>
                <ProgressionControl onPage={[1, 3, 4]}>
                    <OverlayButton
                        onClick={switchView}
                        style={buttonStyle}
                        icon={
                            currentView === View.Lab ? (
                                <Molecules />
                            ) : (
                                <LabIcon />
                            )
                        }
                    >
                        {currentView === View.Lab ? "Molecular" : "Lab"} view
                    </OverlayButton>
                </ProgressionControl>
            </VisibilityControl>
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
