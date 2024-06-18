import { createContext } from "react";
import LiveEventsContextType from "./type";
import LIVE_EVENTS_DEFAULT_STATE from "./default";

const LiveEventsContext = createContext({
    ...LIVE_EVENTS_DEFAULT_STATE,
    handleNewInputConcentration: () => {},
    handleFinishInputConcentrationChange: () => {},
} as LiveEventsContextType);

export default LiveEventsContext;
