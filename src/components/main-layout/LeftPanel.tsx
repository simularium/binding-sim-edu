import React from "react";

import { AgentName, InputConcentration } from "../../types";
import VisibilityControl from "../shared/VisibilityControl";
import EventsOverTimePlot from "../plots/EventsOverTimePlot";
import Concentration from "../concentration-display/Concentration";

interface LeftPanelProps {
    adjustableAgent: AgentName;
    inputConcentration: InputConcentration;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
    inputConcentration,
    adjustableAgent,
}) => {
    return (
        <>
            <VisibilityControl excludedPages={[0, 1]}>
                <Concentration
                    concentration={inputConcentration}
                    adjustableAgent={adjustableAgent}
                />
            </VisibilityControl>
            <VisibilityControl excludedPages={[0, 1, 2, 9, 10]}>
                <EventsOverTimePlot />
            </VisibilityControl>
        </>
    );
};

export default LeftPanel;
