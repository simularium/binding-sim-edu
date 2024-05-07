import { ReactNode, useEffect, useMemo, useState } from "react";
import { uniq } from "lodash";
import { SimulariumController, TimeData } from "@aics/simularium-viewer";
import { CheckCircleOutlined } from "@ant-design/icons";

import "./App.css";
import BindingSimulator from "./simulation/BindingSimulator2D";
import {
    AVAILABLE_AGENTS,
    DEFAULT_TIME_FACTOR,
    INITIAL_CONCENTRATIONS,
    createAgentsFromConcentrations,
    getActiveAgents,
    getInitialConcentrations,
    getMaxConcentration,
} from "./simulation/setup";
import {
    AgentName,
    CurrentConcentration,
    InputConcentration,
    Module,
    TrajectoryStatus,
} from "./types";
import LeftPanel from "./components/main-layout/LeftPanel";
import RightPanel from "./components/main-layout/RightPanel";
import ReactionDisplay from "./components/main-layout/ReactionDisplay";
import ContentPanel from "./components/main-layout/ContentPanel";
import content, { moduleNames } from "./content";
import { DEFAULT_VIEWPORT_SIZE, EXAMPLE_TRAJECTORY_URLS } from "./constants";
import CenterPanel from "./components/main-layout/CenterPanel";
import { SimulariumContext } from "./simulation/context";
import NavPanel from "./components/main-layout/NavPanel";
import AdminUI from "./components/AdminUi";
import { ProductOverTimeTrace } from "./components/plots/types";
import MainLayout from "./components/main-layout/Layout";
import usePageNumber from "./hooks/usePageNumber";
import fetch3DTrajectory from "./utils/fetch3DTrajectory";
import { getCurrentProduct } from "./simulation/results";

const ADJUSTABLE_AGENT = AgentName.B;

function App() {
    const [page, setPage] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [trajectoryStatus, setTrajectoryStatus] = useState(TrajectoryStatus.INITIAL);

    /**
     * Simulation state
     * input values for the simulation
     */
    const [currentModule] = useState(Module.A_B_AB);
    const productName = useMemo(() => {
        return getCurrentProduct(currentModule);
    }, [currentModule]);
    const [inputConcentration, setInputConcentration] =
        useState<InputConcentration>({
            [AgentName.A]:
                INITIAL_CONCENTRATIONS[AgentName.A],
            [AgentName.B]:
                INITIAL_CONCENTRATIONS[AgentName.B],
        });
    const [timeFactor, setTimeFactor] = useState(DEFAULT_TIME_FACTOR);
    const [viewportSize, setViewportSize] = useState(DEFAULT_VIEWPORT_SIZE);
    /**
     * Analysis state
     * used to create plots and feedback
     */
    const [liveConcentration, setLiveConcentration] =
        useState<CurrentConcentration>({
            [AgentName.A]: INITIAL_CONCENTRATIONS[AgentName.A],
            [AgentName.B]: INITIAL_CONCENTRATIONS[AgentName.B],
            [productName]: 0,
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

    // SIMULATION INITIALIZATION
    const simulariumController = useMemo(() => {
        return new SimulariumController({});
    }, []);

    const clientSimulator = useMemo(() => {
        const activeAgents = getActiveAgents(currentModule);
        setInputConcentration(getInitialConcentrations(activeAgents));
        const trajectory = createAgentsFromConcentrations(
            activeAgents,
            INITIAL_CONCENTRATIONS
        );
        resetAnalysisState();
        return new BindingSimulator(trajectory, viewportSize.width / 5);
    }, [currentModule, viewportSize]);

    useEffect(() => {
        simulariumController.changeFile(
            {
                clientSimulator: clientSimulator,
            },
            "binding-simulator"
        );
    }, [simulariumController, clientSimulator]);

    // Synchronize the simulation play with the UI
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


    // Ongoing check to see if they've measured enough values to determine Kd
    const halfFilled = inputConcentration.A ? inputConcentration.A / 2 : 5;
    const uniqMeasuredConcentrations = useMemo(
        () => uniq(inputEquilibriumConcentrations),
        [inputEquilibriumConcentrations]
    );
    const hasAValueAboveKd = useMemo(
        () =>
            uniqMeasuredConcentrations.filter((c) => c > halfFilled).length >=
            1,
        [halfFilled, uniqMeasuredConcentrations]
    );
    const hasAValueBelowKd = useMemo(
        () =>
            uniqMeasuredConcentrations.filter((c) => c < halfFilled).length >=
            1,
        [halfFilled, uniqMeasuredConcentrations]
    );
    const canDetermineEquilibrium = useMemo(() => {
        return (
            hasAValueAboveKd &&
            hasAValueBelowKd &&
            uniqMeasuredConcentrations.length >= 3
        );
    }, [hasAValueAboveKd, hasAValueBelowKd, uniqMeasuredConcentrations]);

    // Special events in page navigation
    // usePageNumber takes a page number, a conditional and a callback 
    usePageNumber(
        page,
        (page) => page === 5,
        () => setIsPlaying(false)
    );
    usePageNumber(
        page,
        (page) => canDetermineEquilibrium && page === 7,
        () => setPage(8)
    );
    
    usePageNumber(
        page,
        (page) =>
            page === content[currentModule].length - 1 &&
            trajectoryStatus == TrajectoryStatus.INITIAL,
        async () => {
            setIsPlaying(false);
            setTrajectoryStatus(TrajectoryStatus.LOADING);
            await fetch3DTrajectory(
                EXAMPLE_TRAJECTORY_URLS[currentModule],
                simulariumController
            );
            setTrajectoryStatus(TrajectoryStatus.LOADED);
        }
    );

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

    // User input handlers
    const handleTimeChange = (timeData: TimeData) => {
        const concentrations =
            clientSimulator.getCurrentConcentrations() as CurrentConcentration;
        const productConcentration = concentrations[productName];
        if (productConcentration !== undefined) {
            const newData = [
                ...currentProductConcentrationArray,
                productConcentration,
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

    const handleNewInputConcentration = (name: string, value: number) => {
        if (value === 0) {
            // this is available on the slider, but we only want it visible
            // as an axis marker, not as a selection
            return;
        }
        const agentName = name as AgentName;
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
            [productName]: 0,
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
            clientSimulator.getCurrentConcentrations()[productName];
        const reactantConcentration = inputConcentration[ADJUSTABLE_AGENT] || 0;

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
                            liveConcentration[productName] || 0,
                        maxConcentration: getMaxConcentration(currentModule),
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
                                title={moduleNames[currentModule]}
                                total={content[currentModule].length}
                            />
                        }
                        content={
                            <ContentPanel {...content[currentModule][page]} />
                        }
                        reactionPanel={
                            <ReactionDisplay reactionType={currentModule} />
                        }
                        leftPanel={
                            <LeftPanel
                                activeAgents={getActiveAgents(currentModule)}
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
                            <CenterPanel reactionType={currentModule} />
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
