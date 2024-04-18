import React, { useContext } from 'react';

import { SimulariumContext } from '../../simulation/context';
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
    activeAgents,
    inputConcentration,
    liveConcentration,
    handleNewInputConcentration,
    bindingEventsOverTime,
    unbindingEventsOverTime,
    adjustableAgent,
}) => {
    const { isPlaying } = useContext(SimulariumContext);
    return (
        <>
            <VisibilityControl excludedPages={[0, 1]}>
                <Concentration
                    activeAgents={activeAgents}
                    concentration={inputConcentration}
                    liveConcentration={liveConcentration}
                    onChange={handleNewInputConcentration}
                    disabled={isPlaying}
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