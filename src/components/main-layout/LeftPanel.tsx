import React, { useContext } from 'react';
import Concentration from '../Concentration';
import { AvailableAgentNames } from '../../types';
import VisibilityControl from '../shared/VisibilityControl';
import { SimulariumContext } from '../../simulation/context';
import EventsOverTimePlot from '../plots/EventsOverTimePlot';

interface LeftPanelProps {
    activeAgents: AvailableAgentNames[];
    adjustableAgent: AvailableAgentNames;
    inputConcentration: { [key in AvailableAgentNames]: number };
    handleNewInputConcentration: (name: string, value: number) => void;
    bindingEventsOverTime: number[];
    unbindingEventsOverTime: number[];
}

const LeftPanel: React.FC<LeftPanelProps> = ({
    activeAgents,
    inputConcentration,
    handleNewInputConcentration,
    bindingEventsOverTime,
    unbindingEventsOverTime,
    adjustableAgent,
}) => {
    const { isPlaying } = useContext(SimulariumContext);
    return (
        <div
            style={{
                minWidth: 260,
                display: "flex",
                flexFlow: "column",
                flex: "1 1 30%",
            }}
        >
            <VisibilityControl excludedPages={[0, 1]}>
                <Concentration
                    activeAgents={activeAgents}
                    concentration={inputConcentration}
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
        </div>
    );
};

export default LeftPanel;