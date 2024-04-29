import React, { useContext, useState } from "react";
import Rainbow from "rainbowvis.js";

import Viewer from "./Viewer";
import { SimulariumContext } from "../simulation/context";
import ProgressionControl from "./shared/ProgressionControl";
import PlayButton from "./PlayButton";
import { OverlayButton } from "./shared/ButtonLibrary";
import LabIcon from "./icons/Lab";
import Molecules from "./icons/Molecules";
import Cuvette from "./icons/Cuvette";
import { AGENT_AB_COLOR } from "../constants/colors";

enum View {
    Lab = "lab",
    Simulation = "simulation",
}

const LabView: React.FC = () => {
    const { currentProductionConcentration, maxConcentration } = useContext(SimulariumContext);
    const rainbow = new Rainbow();
    rainbow.setSpectrum("#FFFFFF", AGENT_AB_COLOR);
    const position = currentProductionConcentration / maxConcentration   * 100;
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
            <Cuvette
                color={rainbow.colorAt(position)}
            />
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
                controller={simulariumController}
                handleTimeChange={handleTimeChange}
            />
        </div>
    );
};

export default ViewSwitch;
