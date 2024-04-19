import React from 'react';

import { AvailableAgentNames } from '../../types';
import VisibilityControl from '../shared/VisibilityControl';
import EventsOverTimePlot from '../plots/EventsOverTimePlot';
import Concentration from '../Concentration';

interface LeftPanelProps {
    activeAgents: AvailableAgentNames[];
    adjustableAgent: AvailableAgentNames;
    inputConcentration: { [key in AvailableAgentNames]: number };
    liveConcentration: { [key in AvailableAgentNames]: number };
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
            <VisibilityControl excludedPages={[0, 1]}>
                <Concentration
                    concentration={inputConcentration}
                    liveConcentration={liveConcentration}
                    onChange={handleNewInputConcentration}
                    adjustableAgent={adjustableAgent}
                />
            </VisibilityControl>
            <VisibilityControl excludedPages={[0, 1, 2]}>
                <EventsOverTimePlot
                    bindingEventsOverTime={bindingEventsOverTime}
                    unbindingEventsOverTime={unbindingEventsOverTime}
                />
            </VisibilityControl>
        </>
    );
};

export default LeftPanel;