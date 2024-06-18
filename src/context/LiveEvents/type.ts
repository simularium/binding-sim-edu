import { CurrentConcentration } from "../../types";

interface LiveEventsContextType {
    recordedConcentrations: number[];
    liveConcentration: CurrentConcentration;
    handleNewInputConcentration: (name: string, value: number) => void;
    handleFinishInputConcentrationChange: (name: string, value: number) => void;
    bindingEventsOverTime: number[];
    unBindingEventsOverTime: number[];
}

export default LiveEventsContextType;
