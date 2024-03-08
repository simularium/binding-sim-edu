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
    const { isPlaying, page } = useContext(SimulariumContext);
    return (
        <div>
            <VisibilityControl excludedPages={[0, 1]} currentPage={page}>
                <Concentration
                    activeAgents={activeAgents}
                    concentration={inputConcentration}
                    onChange={handleNewInputConcentration}
                    disabled={isPlaying}
                />
            </VisibilityControl>
            <VisibilityControl excludedPages={[0, 1, 2]} currentPage={page}>
                <EventsOverTimePlot
                    data={[bindingEventsOverTime, unbindingEventsOverTime]}
                />
            </VisibilityControl>
        </div>
    );
};

export default LeftPanel;