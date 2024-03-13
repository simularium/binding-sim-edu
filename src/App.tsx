import { useEffect, useMemo, useState } from "react";

import "./App.css";
import { SimulariumController } from "@aics/simularium-viewer";
import BindingSimulator from "./simulation/BindingSimulator2D";
import {
    AVAILABLE_AGENTS,
    createAgentsFromConcentrations,
} from "./constants/trajectories";
import { AvailableAgentNames } from "./types";
import Slider from "./components/Slider";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import ReactionDisplay from "./components/ReactionDisplay";
import ContentPanel from "./components/ContentPanel";
import content from "./content";
import { ReactionType } from "./constants";
import CenterPanel from "./components/CenterPanel";
import { SimulariumContext } from "./simulation/context";

const INITIAL_CONCENTRATIONS = { A: 10, B: 10, C: 10 };

const getActiveAgents = (reactionType: ReactionType) => {
    switch (reactionType) {
        case ReactionType.A_B_AB:
            return [AvailableAgentNames.A, AvailableAgentNames.B];
        case ReactionType.A_C_AC:
            return [AvailableAgentNames.A, AvailableAgentNames.C];
        case ReactionType.A_B_C_AB_AC:
            return [
                AvailableAgentNames.A,
                AvailableAgentNames.B,
                AvailableAgentNames.C,
            ];
    }
};

function App() {
    const [page, setPage] = useState(1);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [reactionType, setReactionType] = useState(ReactionType.A_B_AB);
    const [isPlaying, setIsPlaying] = useState(false);
    const [inputConcentration, setInputConcentration] = useState(
        INITIAL_CONCENTRATIONS
    );
    const [timeFactor, setTimeFactor] = useState(30);
    const [productOverTime, setProductOverTime] = useState({
        [inputConcentration[AvailableAgentNames.B]]: [0],
    });

    const simulariumController = useMemo(() => {
        return new SimulariumController({});
    }, []);

    const clientSimulator = useMemo(() => {
        const activeAgents = getActiveAgents(reactionType);
        const trajectory = createAgentsFromConcentrations(
            activeAgents,
            INITIAL_CONCENTRATIONS
        );
        return new BindingSimulator(trajectory);
    }, [reactionType]);

    const handleTimeChange = () => {
        const newValue = clientSimulator.getCurrentConcentrationBound();
        const currentConcentration = inputConcentration[AvailableAgentNames.B];
        const currentArray = productOverTime[currentConcentration];
        const newData = [...currentArray, newValue];
        const newState = {
            ...productOverTime,
            [currentConcentration]: newData,
        };
        setProductOverTime(newState);
    };

    useEffect(() => {
        simulariumController.setCameraType(true);
        simulariumController.changeFile(
            {
                clientSimulator: clientSimulator,
            },
            "binding-simulator"
        );
    }, [simulariumController, clientSimulator]);

    useEffect(() => {
        if (isPlaying) {
            clientSimulator.initialState = false;
            simulariumController.resume();
        } else {
            simulariumController.pause();
        }
    }, [isPlaying, simulariumController, clientSimulator]);

    useEffect(() => {
        clientSimulator.setTimeScale(timeFactor);
    }, [timeFactor, clientSimulator]);

    const handleNewInputConcentration = (name: string, value: number) => {
        const agentName = name as AvailableAgentNames;
        const agentId = AVAILABLE_AGENTS[agentName].id;
        clientSimulator.changeConcentration(agentId, value);

        setInputConcentration({ ...inputConcentration, [name]: value });
        const time = simulariumController.time();
        const newState = {
            ...productOverTime,
            [value]: [],
        };
        setProductOverTime(newState);
        simulariumController.gotoTime(time + 1);
    };

    return (
        <>
            <div className="app">
                <SimulariumContext.Provider
                    value={{
                        isPlaying,
                        setIsPlaying,
                        simulariumController,
                        handleTimeChange,
                        page,
                        setPage,
                    }}
                >
                    <ContentPanel {...content[reactionType][page]} />
                    <ReactionDisplay reactionType={reactionType} />
                    <Slider
                        // This is a debugging feature but wont
                        // be present in the app
                        min={0}
                        max={100}
                        initialValue={timeFactor}
                        onChange={(_, value) => {
                            setTimeFactor(value);
                        }}
                        disabled={false}
                        name="time factor (ns)"
                    />
                    <LeftPanel
                        activeAgents={getActiveAgents(reactionType)}
                        inputConcentration={inputConcentration}
                        handleNewInputConcentration={
                            handleNewInputConcentration
                        }
                    />
                    <RightPanel productOverTime={productOverTime} />
                    <CenterPanel />
                </SimulariumContext.Provider>
            </div>
        </>
    );
}

export default App;
