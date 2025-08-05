import React, { useContext, useState } from "react";

import Viewer from "./Viewer";
import { SimulariumContext } from "../simulation/context";
import ProgressionControl from "./shared/ProgressionControl";
import PlayButton from "./PlayButton";
import { OverlayButton } from "./shared/ButtonLibrary";
import LabIcon from "./icons/Lab";
import Molecules from "./icons/Molecules";
import LabView from "./LabView";
import VisibilityControl from "./shared/VisibilityControl";
import { Module, Section } from "../types";
import { FIRST_PAGE } from "../content";
import useModule from "../hooks/useModule";
import MixButton from "./MixButton";

enum View {
    Lab = "lab",
    Simulation = "simulation",
}

const ViewSwitch: React.FC = () => {
    const [currentView, setCurrentView] = useState<View>(View.Lab);
    const [previousModule, setPreviousModule] = useState<Module>(Module.A_B_AB);

    const switchView = () => {
        setCurrentView((prevView) =>
            prevView === View.Lab ? View.Simulation : View.Lab
        );
    };
    const { page, isPlaying, setIsPlaying, handleTimeChange, module } =
        useContext(SimulariumContext);

    const isFirstPageOfFirstModule =
        page === FIRST_PAGE[module] + 1 && module === Module.A_B_AB;

    if (isFirstPageOfFirstModule && currentView === View.Simulation) {
        setCurrentView(View.Lab);
    }

    const { contentData } = useModule(module);

    // Show the sim view at the beginning of the module
    if (module !== previousModule) {
        setPreviousModule(module);
        if (contentData[page].section === Section.Experiment) {
            if (currentView === View.Lab) {
                setCurrentView(View.Simulation);
            }
        }
    }

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
                <ProgressionControl onPage={{ [Module.A_B_AB]: [1, 3, 4] }}>
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
            <MixButton />
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
