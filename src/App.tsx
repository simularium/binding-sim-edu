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
    INITIAL_CONCENTRATIONS,
    createAgentsFromConcentrations,
    getActiveAgents,
    getInitialConcentrations,
    getMaxConcentration,
} from "./simulation/trajectories-settings";
import {
    AvailableAgentNames,
    CurrentConcentration,
    InputConcentration,
    ProductNames,
} from "./types";
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
import { insertIntoArray, insertValueSorted } from "./utils";

const ADJUSTABLE_AGENT = AvailableAgentNames.B;

function App() {
    const [page, setPage] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);

    /**
     * Simulation state
     * input values for the simulation
     */
    const [reactionType] = useState(ReactionType.A_B_AB);
    const [inputConcentration, setInputConcentration] =
        useState<InputConcentration>({
            [AvailableAgentNames.A]:
                INITIAL_CONCENTRATIONS[AvailableAgentNames.A],
            [AvailableAgentNames.B]:
                INITIAL_CONCENTRATIONS[AvailableAgentNames.B],
        });
    const [timeFactor, setTimeFactor] = useState(DEFAULT_TIME_FACTOR);
    const [viewportSize, setViewportSize] = useState(DEFAULT_VIEWPORT_SIZE);
    /**
     * Analysis state
     * used to create plots and feedback
     */
    const [liveConcentration, setLiveConcentration] =
        useState<CurrentConcentration>({
            [AvailableAgentNames.A]:
                INITIAL_CONCENTRATIONS[AvailableAgentNames.A],
            [AvailableAgentNames.B]:
                INITIAL_CONCENTRATIONS[AvailableAgentNames.B],
            [ProductNames.AB]: 0,
        });
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
    const [equilibriumFeedback, setEquilibriumFeedback] = useState<
        ReactNode | string
    >("");
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

        setInputConcentration(getInitialConcentrations(activeAgents));
        const trajectory = createAgentsFromConcentrations(
            activeAgents,
            INITIAL_CONCENTRATIONS
        );
        resetAnalysisState();
        return new BindingSimulator(trajectory, viewportSize.width / 5);
    }, [reactionType, viewportSize]);

    const handleTimeChange = (timeData: TimeData) => {
        const concentrations =
            clientSimulator.getCurrentConcentrations() as CurrentConcentration;
        if (concentrations[ProductNames.AB] !== undefined) {
            // for the first module this will always be true
            const newData = [
                ...currentProductConcentrationArray,
                concentrations[ProductNames.AB],
            ];
            setCurrentProductConcentrationArray(newData);
        }
        setLiveConcentration(concentrations);

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
        if (value === 0) {
            // this is available on the slider, but we only want it visible
            // as an axis marker, not as a selection
            return;
        }
        const agentName = name as AvailableAgentNames;
        const agentId = AVAILABLE_AGENTS[agentName].id;
        clientSimulator.changeConcentration(agentId, value);
        const previousConcentration = inputConcentration[agentName] || 0;
        addProductionTrace(previousConcentration);
        setInputConcentration({ ...inputConcentration, [name]: value });
        const time = simulariumController.time();

        simulariumController.gotoTime(time + 1);

        setLiveConcentration({
            ...inputConcentration,
            [name]: value,
            [ProductNames.AB]: 0,
        });

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
            clientSimulator.getCurrentConcentrations()[ProductNames.AB];
        const reactantConcentration = inputConcentration[ADJUSTABLE_AGENT] || 0;

        if (!clientSimulator.isMixed()) {
            setEquilibriumFeedbackTimeout("Not yet!");
            return false;
        }
        const { newArray, index } = insertValueSorted(
            inputEquilibriumConcentrations,
            reactantConcentration
        );
        setInputEquilibriumConcentrations(newArray as number[]);
        const newProductArray = insertIntoArray(
            productEquilibriumConcentrations,
            index,
            productConcentration
        );
        setProductEquilibriumConcentrations(newProductArray as number[]);
        setEquilibriumFeedbackTimeout(
            <>
                Great! <CheckCircleOutlined />
            </>
        );
    };

    return (
        <>
            <div className="app">
                <SimulariumContext.Provider
                    value={{
                        currentProductionConcentration:
                            liveConcentration[ProductNames.AB] || 0,
                        maxConcentration: getMaxConcentration(reactionType),
                        isPlaying,
                        setIsPlaying,
                        simulariumController,
                        handleTimeChange,
                        page,
                        setPage,
                        timeFactor,
                        viewportSize,
                        setViewportSize,
                        recordedConcentrations: inputEquilibriumConcentrations,
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
                            <ContentPanel {...content[reactionType][page]} />
                        }
                        reactionPanel={
                            <ReactionDisplay reactionType={reactionType} />
                        }
                        leftPanel={
                            <LeftPanel
                                activeAgents={getActiveAgents(reactionType)}
                                inputConcentration={inputConcentration}
                                liveConcentration={liveConcentration}
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
                                    inputConcentration[ADJUSTABLE_AGENT] || 0
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
