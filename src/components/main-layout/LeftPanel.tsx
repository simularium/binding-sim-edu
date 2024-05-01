import React from "react";

import {
    AvailableAgentNames,
    CurrentConcentration,
    InputConcentration,
} from "../../types";
import VisibilityControl from "../shared/VisibilityControl";
import EventsOverTimePlot from "../plots/EventsOverTimePlot";
import Concentration from "../concentration-display/Concentration";

interface LeftPanelProps {
    activeAgents: AvailableAgentNames[];
    adjustableAgent: AvailableAgentNames;
    inputConcentration: InputConcentration;
    liveConcentration: CurrentConcentration;
    handleNewInputConcentration: (name: string, value: number) => void;
    bindingEventsOverTime: number[];
    unbindingEventsOverTime: number[];
}

const LeftPanel: React.FC<LeftPanelProps> = ({
    inputConcentration,
    liveConcentration,
    handleNewInputConcentration,
    bindingEventsOverTime,
    unbindingEventsOverTime,
    adjustableAgent,
}) => {
    return (
        <>
            <VisibilityControl excludedPages={[0, 1, 9, 10]}>
                <Concentration
                    concentration={inputConcentration}
                    liveConcentration={liveConcentration}
                    onChange={handleNewInputConcentration}
                    adjustableAgent={adjustableAgent}
                />
            </VisibilityControl>
            <VisibilityControl excludedPages={[0, 1, 2, 9, 10]}>
                <EventsOverTimePlot
                    bindingEventsOverTime={bindingEventsOverTime}
                    unbindingEventsOverTime={unbindingEventsOverTime}
                />
            </VisibilityControl>
        </>
    );
};

export default LeftPanel;
