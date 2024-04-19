import { ReactNode, useEffect, useMemo, useState } from "react";
import { uniq } from "lodash";
import { SimulariumController, TimeData } from "@aics/simularium-viewer";
import { CheckCircleOutlined } from "@ant-design/icons";

import "./App.css";
import BindingSimulator from "./simulation/BindingSimulator2D";
import {
    AVAILABLE_AGENTS,
    DEFAULT_TIME_FACTOR,
    DEFAULT_VIEWPORT_SIZE,
    createAgentsFromConcentrations,
} from "./constants/trajectories";
import { AvailableAgentNames } from "./types";
import LeftPanel from "./components/main-layout/LeftPanel";
import RightPanel from "./components/main-layout/RightPanel";
import ReactionDisplay from "./components/main-layout/ReactionDisplay";
import ContentPanel from "./components/main-layout/ContentPanel";
import content, { moduleNames } from "./content";
import { ReactionType } from "./constants";
import CenterPanel from "./components/main-layout/CenterPanel";
import { SimulariumContext } from "./simulation/context";
import NavPanel from "./components/main-layout/NavPanel";
import AdminUI from "./components/AdminUi";
import { ProductOverTimeTrace } from "./components/plots/types";
import MainLayout from "./components/main-layout/Layout";

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

const ADJUSTABLE_AGENT = AvailableAgentNames.B;

function App() {
    const [page, setPage] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);

    /**
     * Simulation state
     * input values for the simulation
     */
    const [reactionType] = useState(ReactionType.A_B_AB);
    const [inputConcentration, setInputConcentration] = useState(
        INITIAL_CONCENTRATIONS
    );
    const [timeFactor, setTimeFactor] = useState(DEFAULT_TIME_FACTOR);
    const [viewportSize, setViewportSize] = useState(DEFAULT_VIEWPORT_SIZE);
    /**
     * Analysis state
     * used to create plots and feedback
     */
    const [productOverTimeTraces, setProductOverTimeTraces] = useState<
        ProductOverTimeTrace[]
    >([]);
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
    const [equilibriumFeedback, setEquilibriumFeedback] = useState<ReactNode | string>("");
    const [
        currentProductConcentrationArray,
        setCurrentProductConcentrationArray,
    ] = useState<number[]>([]);

    const resetAnalysisState = () => {
        setBindingEventsOverTime([]);
        setUnBindingEventsOverTime([]);
        setCurrentProductConcentrationArray([]);
    };

    const simulariumController = useMemo(() => {
        return new SimulariumController({});
    }, []);

    const clientSimulator = useMemo(() => {
        const activeAgents = getActiveAgents(reactionType);
        const trajectory = createAgentsFromConcentrations(
            activeAgents,
            INITIAL_CONCENTRATIONS
        );
        resetAnalysisState();
        return new BindingSimulator(trajectory, viewportSize.width/5);
    }, [reactionType, viewportSize]);

    const handleTimeChange = (timeData: TimeData) => {
        const newValue = clientSimulator.getCurrentConcentrationBound();
        const newData = [...currentProductConcentrationArray, newValue];
        setCurrentProductConcentrationArray(newData);

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
        // we pause the simulation to show them how to adjust
        // the concentration of the reactant
        // this happens on page 5.
        if (page === 5) {
            setIsPlaying(false);
        }
        // they have finished recording equilibrium concentrations
        // I don't love that this breaks the progression control handling all
        // progress through the content, but I can't think of a way to include this
        // in the progression control without making it more complicated
        if (uniq(inputEquilibriumConcentrations).length >= 6 && page === 7) {
            setPage(page + 1);
        }
    }, [page, inputEquilibriumConcentrations]);


    const addProductionTrace = (previousConcentration: number) => {
        const traces = productOverTimeTraces;
        if (currentProductConcentrationArray.length > 0) {
            const newTrace = {
                inputConcentration: previousConcentration,
                productConcentrations: currentProductConcentrationArray,
            };
            setProductOverTimeTraces([...traces, newTrace]);
        }
    };

    
    const handleNewInputConcentration = (name: string, value: number) => {
        const agentName = name as AvailableAgentNames;
        const agentId = AVAILABLE_AGENTS[agentName].id;
        clientSimulator.changeConcentration(agentId, value);
        const previousConcentration = inputConcentration[agentName];
        addProductionTrace(previousConcentration);
        setInputConcentration({ ...inputConcentration, [name]: value });
        const time = simulariumController.time();
        simulariumController.gotoTime(time + 1);
        resetAnalysisState();
    };

    const setEquilibriumFeedbackTimeout = (message: ReactNode | string) => {
        setEquilibriumFeedback(message);
        setTimeout(() => {
            setEquilibriumFeedback("");
        }, 3000);
    };

    const handleRecordEquilibrium = () => {
        const productConcentration =
            clientSimulator.getCurrentConcentrationBound();
        const reactantConcentration = inputConcentration[ADJUSTABLE_AGENT];

        if (!clientSimulator.isMixed()) {
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
        setEquilibriumFeedbackTimeout(<>Great! <CheckCircleOutlined /></>);
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
                        timeFactor,
                        viewportSize,
                        setViewportSize,
                    }}
                >
                    <MainLayout
                        header={
                            <NavPanel
                                page={page}
                                title={moduleNames[reactionType]}
                                total={content[reactionType].length}
                            />
                        }
                        content={
                                <ContentPanel
                                    {...content[reactionType][page]}
                                />
                                
                        }
                        reactionPanel={<ReactionDisplay reactionType={reactionType} />}
                        leftPanel={
                            <LeftPanel
                                activeAgents={getActiveAgents(reactionType)}
                                inputConcentration={inputConcentration}
                                handleNewInputConcentration={
                                    handleNewInputConcentration
                                }
                                bindingEventsOverTime={bindingEventsOverTime}
                                unbindingEventsOverTime={
                                    unBindingEventsOverTime
                                }
                                adjustableAgent={ADJUSTABLE_AGENT}
                            />
                        }
                        centerPanel={
                            <CenterPanel reactionType={reactionType} />
                        }
                        rightPanel={
                            <RightPanel
                                productOverTimeTraces={productOverTimeTraces}
                                currentProductConcentrationArray={
                                    currentProductConcentrationArray
                                }
                                handleRecordEquilibrium={
                                    handleRecordEquilibrium
                                }
                                currentAdjustableAgentConcentration={
                                    inputConcentration[ADJUSTABLE_AGENT]
                                }
                                equilibriumConcentrations={{
                                    inputConcentrations:
                                        inputEquilibriumConcentrations,
                                    productConcentrations:
                                        productEquilibriumConcentrations,
                                }}
                                equilibriumFeedback={equilibriumFeedback}
                            />
                        }
                    />
                    <AdminUI
                        timeFactor={timeFactor}
                        setTimeFactor={setTimeFactor}
                    />
                </SimulariumContext.Provider>
            </div>
        </>
    );
}

export default App;
