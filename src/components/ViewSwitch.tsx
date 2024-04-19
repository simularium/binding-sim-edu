import React, { useContext, useState } from "react";

import Viewer from "./Viewer";
import { SimulariumContext } from "../simulation/context";
import ProgressionControl from "./shared/ProgressionControl";
import PlayButton from "./PlayButton";
import { OverlayButton } from "./shared/ButtonLibrary";
import LabIcon from "./icons/Lab";
import Molecules from "./icons/Molecules";

enum View {
    Lab = "lab",
    Simulation = "simulation",
}

const LabView: React.FC = () => {
    return (
        <div
            style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                background: "black",
                zIndex: 300,
            }}
        >
            <h1>Lab View</h1>
        </div>
    );
};

const ViewSwitch: React.FC = () => {
    const [currentView, setCurrentView] = useState<View>(View.Lab);

    const switchView = () => {
        setCurrentView((prevView) =>
            prevView === View.Lab ? View.Simulation : View.Lab
        );
    };
    const { isPlaying, setIsPlaying, simulariumController, handleTimeChange } =
        useContext(SimulariumContext);
    if (!simulariumController) {
        return null;
    }
    return (
        <div style={{ position: "relative", height: "100%" }}>
            <ProgressionControl onPage={1}>
                <OverlayButton
                    onClick={switchView}
                    style={{ top: 16, left: 16 }}
                    icon={currentView === View.Lab ? <Molecules /> : <LabIcon />}
                >
                     Switch to{" "}
                    {currentView === View.Lab ? "molecular" : "lab"} view
                </OverlayButton>
            </ProgressionControl>
            <PlayButton />
            {currentView === View.Lab ? <LabView /> : null}
            <Viewer
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                controller={simulariumController}
                handleTimeChange={handleTimeChange}
            />
        </div>
    );
};

export default ViewSwitch;
