import React from "react";

import {
    AgentName,
    CurrentConcentration,
    InputConcentration,
    Module,
} from "../../types";
import VisibilityControl from "../shared/VisibilityControl";
import EventsOverTimePlot from "../plots/EventsOverTimePlot";
import Concentration from "../concentration-display/Concentration";

interface LeftPanelProps {
    adjustableAgent: AgentName;
    inputConcentration: InputConcentration;
    liveConcentration: CurrentConcentration;
    handleFinishInputConcentrationChange: (name: string, value: number) => void;
    handleNewInputConcentration: (name: string, value: number) => void;
    bindingEventsOverTime: number[];
    unbindingEventsOverTime: number[];
}

const LeftPanel: React.FC<LeftPanelProps> = ({
    inputConcentration,
    liveConcentration,
    handleNewInputConcentration,
    handleFinishInputConcentrationChange,
    bindingEventsOverTime,
    unbindingEventsOverTime,
    adjustableAgent,
}) => {
    const concentrationExcludedPages = {
        [Module.A_B_AB]: [0, 1],
        [Module.A_C_AC]: [],
        [Module.A_B_D_AB]: [],
    };

    const eventsOverTimeExcludedPages = {
        [Module.A_B_AB]: [0, 1, 2],
        [Module.A_C_AC]: [],
    };
    return (
        <>
            <VisibilityControl excludedPages={concentrationExcludedPages}>
                <Concentration
                    concentration={inputConcentration}
                    liveConcentration={liveConcentration}
                    onChangeComplete={handleFinishInputConcentrationChange}
                    onChange={handleNewInputConcentration}
                    adjustableAgent={adjustableAgent}
                />
            </VisibilityControl>
            <VisibilityControl
                excludedPages={eventsOverTimeExcludedPages}
                includedPages={{ [Module.A_B_D_AB]: [] }} // don't show at all in last module
                notInBonusMaterial
            >
                <EventsOverTimePlot
                    bindingEventsOverTime={bindingEventsOverTime}
                    unbindingEventsOverTime={unbindingEventsOverTime}
                />
            </VisibilityControl>
        </>
    );
};

export default LeftPanel;
