import React, { useContext } from 'react';
import Concentration from './Concentration';
import { AvailableAgentNames } from '../types';
import VisibilityControl from './VisibilityControl';
import { SimulariumContext } from '../simulation/context';
import EventsOverTimePlot from './EventsOverTimePlot';

interface LeftPanelProps {
    activeAgents: AvailableAgentNames[];
    inputConcentration: { [key in AvailableAgentNames]: number };
    handleNewInputConcentration: (name: string, value: number) => void;
    bindingEventsOverTime:number[];
    unbindingEventsOverTime:number[];
}

const LeftPanel: React.FC<LeftPanelProps> = ({
    activeAgents,
    inputConcentration,
    handleNewInputConcentration,
    bindingEventsOverTime,
    unbindingEventsOverTime,
}) => {
    const { isPlaying } = useContext(SimulariumContext);
    return (
        <div>
            <VisibilityControl excludedPages={[0, 1]}>
                <Concentration
                    activeAgents={activeAgents}
                    concentration={inputConcentration}
                    onChange={handleNewInputConcentration}
                    disabled={isPlaying}
                />
            </VisibilityControl>
            <VisibilityControl excludedPages={[0, 1, 2]} >
                <EventsOverTimePlot
                    bindingEventsOverTime={bindingEventsOverTime}
                    unbindingEventsOverTime={unbindingEventsOverTime}
                />
            </VisibilityControl>
        </div>
    );
};

export default LeftPanel;