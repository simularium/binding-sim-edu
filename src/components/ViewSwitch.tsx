import React, { useContext, useState } from "react";

import Viewer from "./Viewer";
import { SimulariumContext } from "../simulation/context";
import ProgressionControl from "./shared/ProgressionControl";
import Button from "./shared/Button";
import PlayButton from "./PlayButton";

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
        <div style={{ position: "relative" }}>
            <ProgressionControl onPage={1}>
                <Button
                    ghost
                    onClick={switchView}
                    style={{ position: "absolute", zIndex: 3001 }}
                >
                    Switch to {currentView === View.Lab ? "Simulation" : "Lab"}{" "}
                    View
                </Button>
            </ProgressionControl>
            <PlayButton />

            <div
                className="viewer-wrapper"
                style={{
                    position: "relative",
                    height: "500",
                    width: "500",
                    zIndex: 300,
                }}
            >
                {currentView === View.Lab ? <LabView /> : null}

                <Viewer
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    controller={simulariumController}
                    handleTimeChange={handleTimeChange}
                />
            </div>
        </div>
    );
};

export default ViewSwitch;
