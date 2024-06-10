import React, { useContext, useState } from "react";

import Viewer from "./Viewer";
import { AppContext } from "../context/context";
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
    hasProgressed: boolean;
}

const ViewSwitch: React.FC<ViewSwitchProps> = ({ hasProgressed }) => {
    const [currentView, setCurrentView] = useState<View>(View.Lab);

    const switchView = () => {
        setCurrentView((prevView) =>
            prevView === View.Lab ? View.Simulation : View.Lab
        );
    };
    const { page } = useContext(AppContext);

    if (page === 1 && hasProgressed) {
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
            {currentView === View.Lab ? <LabView /> : null}
            <Viewer />
        </div>
    );
};

export default ViewSwitch;
