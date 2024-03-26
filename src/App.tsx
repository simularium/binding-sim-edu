import { useEffect, useMemo, useState } from "react";
import { uniq } from "lodash";
import { SimulariumController, TimeData } from "@aics/simularium-viewer";

import "./App.css";
import BindingSimulator from "./simulation/BindingSimulator2D";
import {
    AVAILABLE_AGENTS,
    createAgentsFromConcentrations,
} from "./constants/trajectories";
import { AvailableAgentNames } from "./types";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import ReactionDisplay from "./components/ReactionDisplay";
import ContentPanel from "./components/ContentPanel";
import content, { moduleNames } from "./content";
import { ReactionType } from "./constants";
import CenterPanel from "./components/CenterPanel";
import { SimulariumContext } from "./simulation/context";
import NavPanel from "./components/NavPanel";
import AdminUI from "./components/AdminUi";

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
    const [reactionType] = useState(ReactionType.A_B_AB);
    const [isPlaying, setIsPlaying] = useState(false);
    const [inputConcentration, setInputConcentration] = useState(
        INITIAL_CONCENTRATIONS
    );
    const [timeFactor, setTimeFactor] = useState(30);
    const [productOverTime, setProductOverTime] = useState({
        [inputConcentration[AvailableAgentNames.B]]: [0],
    });
    const [bindingEventsOverTime, setBindingEventsOverTime] = useState<
        number[]
    >([]);
    const [unBindingEventsOverTime, setUnBindingEventsOverTime] = useState<
        number[]
    >([]);
    const [inputEquilibriumConcentrations, setInputEquilibriumConcentrations] =
        useState<number[]>([]);
    const [
        productEquilibriumConcentrations,
        setProductEquilibriumConcentrations,
    ] = useState<number[]>([]);
    const [equilibriumFeedback, setEquilibriumFeedback] = useState<string>("");

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

    const handleTimeChange = (timeData: TimeData) => {
        const newValue = clientSimulator.getCurrentConcentrationBound();
        const currentConcentration = inputConcentration[AvailableAgentNames.B];
        const currentArray = productOverTime[currentConcentration];
        const newData = [...currentArray, newValue];
        const newState = {
            ...productOverTime,
            [currentConcentration]: newData,
        };
        setProductOverTime(newState);

        if (timeData.time % 10 === 0) {
            const { numberBindEvents, numberUnBindEvents } =
                clientSimulator.getEvents();
            setBindingEventsOverTime([
                ...bindingEventsOverTime,
                numberBindEvents,
            ]);
            setUnBindingEventsOverTime([
                ...unBindingEventsOverTime,
                numberUnBindEvents,
            ]);
        }
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

    useEffect(() => {
        if (page === 5) {
            setIsPlaying(false);
        }
        // they have finished recording equilibrium concentrations
        // I don't love that this breaks the progression control handling all
        // progress through the content, but I can't think of a way to include this
        // in the progression control without making it more complicated
        if (uniq(inputEquilibriumConcentrations).length >= 6) {
            setPage(8);
        }
    }, [page, inputEquilibriumConcentrations]);

    const resetState = () => {
        setBindingEventsOverTime([]);
        setUnBindingEventsOverTime([]);
    };

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
        resetState();
    };

    const setEquilibriumFeedbackTimeout = (message: string) => {
        setEquilibriumFeedback(message);
        setTimeout(() => {
            setEquilibriumFeedback("");
        }, 3000);
    };

    const handleRecordEquilibrium = () => {
        const productConcentration =
            clientSimulator.getCurrentConcentrationBound();
        const reactantConcentration = inputConcentration[AvailableAgentNames.B];

        // TODO: do a better job of determining if we've reached equilibrium
        // for now we're using how long the simulation has been running
        // as a proxy for reaching equilibrium
        const currentConcentration = inputConcentration[AvailableAgentNames.B];
        const currentArray = productOverTime[currentConcentration];
        const currentTime = currentArray.length;
        if (currentTime < 200) {
            setEquilibriumFeedbackTimeout("Not yet!");
            return false;
        }
        setInputEquilibriumConcentrations([
            ...inputEquilibriumConcentrations,
            reactantConcentration,
        ]);
        setProductEquilibriumConcentrations([
            ...productEquilibriumConcentrations,
            productConcentration,
        ]);
        setEquilibriumFeedbackTimeout("Great!");
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
                    <NavPanel
                        page={page}
                        title={moduleNames[reactionType]}
                        total={content[reactionType].length}
                    />
                    <ContentPanel {...content[reactionType][page]} />
                    <ReactionDisplay reactionType={reactionType} />

                    <div style={{ display: "flex" }}>
                        <LeftPanel
                            activeAgents={getActiveAgents(reactionType)}
                            inputConcentration={inputConcentration}
                            handleNewInputConcentration={
                                handleNewInputConcentration
                            }
                            bindingEventsOverTime={bindingEventsOverTime}
                            unbindingEventsOverTime={unBindingEventsOverTime}
                        />
                        <CenterPanel reactionType={reactionType} />
                        <RightPanel
                            productOverTime={productOverTime}
                            handleRecordEquilibrium={handleRecordEquilibrium}
                            equilibriumConcentrations={{
                                inputConcentrations:
                                    inputEquilibriumConcentrations,
                                productConcentrations:
                                    productEquilibriumConcentrations,
                            }}
                            equilibriumFeedback={equilibriumFeedback}
                        />
                    </div>
                    <AdminUI timeFactor={timeFactor} setTimeFactor={setTimeFactor}/>
                </SimulariumContext.Provider>
            </div>
        </>
    );
}

export default App;
