import React, { useContext, useState } from "react";

import Viewer from "./Viewer";
import { AppContext } from "../context";
import ProgressionControl from "./shared/ProgressionControl";
import PlayButton from "./PlayButton";
import { OverlayButton } from "./shared/ButtonLibrary";
import LabIcon from "./icons/Lab";
import Molecules from "./icons/Molecules";
import LabView from "./LabView";

enum View {
    Lab = "lab",
    Simulation = "simulation",
}

interface ViewSwitchProps {
    currentProductConcentration: number;
}

const ViewSwitch: React.FC<ViewSwitchProps> = ({
    currentProductConcentration,
}) => {
    const { page, hasProgressed } = useContext(AppContext);
    const [currentView, setCurrentView] = useState<View>(View.Lab);

    const switchView = () => {
        setCurrentView((prevView) =>
            prevView === View.Lab ? View.Simulation : View.Lab
        );
    };

    if (page === 1 && hasProgressed && currentView === View.Simulation) {
        setCurrentView(View.Lab);
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
            {currentView === View.Lab ? (
                <LabView
                    currentProductConcentration={currentProductConcentration}
                />
            ) : null}
            <Viewer />
        </div>
    );
};

export default ViewSwitch;
