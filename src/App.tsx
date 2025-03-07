import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import {
    SimulariumController,
    TimeData,
    TrajectoryFileInfo,
} from "@aics/simularium-viewer";
import { CheckCircleOutlined } from "@ant-design/icons";

import "./App.css";
import BindingSimulator from "./simulation/BindingSimulator2D";
import {
    AgentName,
    CurrentConcentration,
    InputConcentration,
    Module,
    ProductName,
    ScatterTrace,
    Section,
    TrajectoryStatus,
} from "./types";
import LeftPanel from "./components/main-layout/LeftPanel";
import RightPanel from "./components/main-layout/RightPanel";
import ReactionDisplay from "./components/main-layout/ReactionDisplay";
import ContentPanelTimer from "./components/main-layout/ContentPanelTimer";
import content, { moduleNames } from "./content";
import {
    PROMPT_TO_ADJUST_B,
    DEFAULT_VIEWPORT_SIZE,
    LIVE_SIMULATION_NAME,
} from "./constants";
import CenterPanel from "./components/main-layout/CenterPanel";
import { SimulariumContext } from "./simulation/context";
import NavPanel from "./components/main-layout/NavPanel";
import AdminUI from "./components/AdminUi";
import { ProductOverTimeTrace } from "./components/plots/types";
import MainLayout from "./components/main-layout/Layout";
import usePageNumber from "./hooks/usePageNumber";
import fetch3DTrajectory from "./utils/fetch3DTrajectory";
import {
    getColorIndex,
    indexToTime,
    insertValueSorted,
    updateArrayInState,
} from "./utils";
import PreComputedPlotData from "./simulation/PreComputedPlotData";
import PreComputedSimulationData from "./simulation/PreComputedSimulationData";
import LiveSimulationData from "./simulation/LiveSimulationData";
import { PLOT_COLORS } from "./components/plots/constants";
import useModule from "./hooks/useModule";

function App() {
    const [page, setPage] = useState(1);
    const [time, setTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [trajectoryStatus, setTrajectoryStatus] = useState(
        TrajectoryStatus.INITIAL
    );

    /**
     * Simulation state
     * input values for the simulation
     */

    const [trajectoryName, setTrajectoryName] = useState(LIVE_SIMULATION_NAME);
    const simulationData = useMemo(() => {
        if (trajectoryName === LIVE_SIMULATION_NAME) {
            return new LiveSimulationData();
        } else {
            return new PreComputedSimulationData();
        }
    }, [trajectoryName]);
    const [currentModule, setCurrentModule] = useState(Module.A_B_AB);
    const [finalTime, setFinalTime] = useState(-1);
    const productName: ProductName = useMemo(() => {
        return simulationData.getCurrentProduct(currentModule);
    }, [currentModule, simulationData]);

    const [inputConcentration, setInputConcentration] =
        useState<InputConcentration>({
            [AgentName.A]:
                LiveSimulationData.INITIAL_CONCENTRATIONS[AgentName.A],
            [AgentName.B]:
                LiveSimulationData.INITIAL_CONCENTRATIONS[AgentName.B],
        });
    const [timeFactor, setTimeFactor] = useState(
        LiveSimulationData.INITIAL_TIME_FACTOR
    );
    const [viewportSize, setViewportSize] = useState(DEFAULT_VIEWPORT_SIZE);
    const adjustableAgentName =
        LiveSimulationData.ADJUSTABLE_AGENT_MAP[currentModule];
    /**
     * Analysis state
     * used to create plots and feedback
     */
    const [trajectoryPlotData, setTrajectoryPlotData] =
        useState<ScatterTrace[]>();
    const [liveConcentration, setLiveConcentration] =
        useState<CurrentConcentration>({
            [AgentName.A]:
                LiveSimulationData.INITIAL_CONCENTRATIONS[AgentName.A],
            [AgentName.B]:
                LiveSimulationData.INITIAL_CONCENTRATIONS[AgentName.B],
            [productName]: 0,
        });
    const [recordedInputConcentration, setRecordedInputConcentration] =
        useState<number[]>([]);
    const [productOverTimeTraces, setProductOverTimeTraces] = useState<
        ProductOverTimeTrace[]
    >([]);
    const [bindingEventsOverTime, setBindingEventsOverTime] = useState<
        number[]
    >([]);
    const [unBindingEventsOverTime, setUnBindingEventsOverTime] = useState<
        number[]
    >([]);
    const [recordedReactantConcentrations, setRecordedReactantConcentration] =
        useState<number[]>([]);
    const [timeToReachEquilibrium, setTimeToReachEquilibrium] = useState<
        number[]
    >([]);
    const [dataColors, setDataColors] = useState<string[]>([]);
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

    const resetCurrentRunAnalysisState = () => {
        setBindingEventsOverTime([]);
        setUnBindingEventsOverTime([]);
        setCurrentProductConcentrationArray([]);
    };

    const clearAllAnalysisState = useCallback(() => {
        resetCurrentRunAnalysisState();
        setRecordedInputConcentration([]);
        setProductOverTimeTraces([]);
        setRecordedReactantConcentration([]);
        setTimeToReachEquilibrium([]);
        setDataColors([]);
    }, []);

    // SIMULATION INITIALIZATION
    const simulariumController = useMemo(() => {
        return new SimulariumController({});
    }, []);

    const clientSimulator = useMemo(() => {
        const activeAgents = simulationData.getActiveAgents(currentModule);
        setInputConcentration(
            simulationData.getInitialConcentrations(activeAgents)
        );
        resetCurrentRunAnalysisState();
        const trajectory =
            simulationData.createAgentsFromConcentrations(activeAgents);
        if (!trajectory) {
            return null;
        }
        const longestAxis = Math.max(viewportSize.width, viewportSize.height);
        return new BindingSimulator(trajectory, longestAxis / 3);
    }, [currentModule, viewportSize, simulationData]);

    const preComputedPlotDataManager = useMemo(() => {
        if (!trajectoryPlotData) {
            return null;
        }
        return new PreComputedPlotData(trajectoryPlotData);
    }, [trajectoryPlotData]);

    useEffect(() => {
        if (!clientSimulator) {
            return;
        }
        simulariumController.changeFile(
            {
                clientSimulator: clientSimulator,
            },
            LIVE_SIMULATION_NAME
        );
    }, [simulariumController, clientSimulator]);

    const isLastFrame = useMemo(() => {
        return finalTime > 0 && time >= finalTime - timeFactor;
    }, [time, finalTime, timeFactor]);

    // Synchronize the simulation play with the UI
    useEffect(() => {
        if (isPlaying) {
            if (clientSimulator) {
                clientSimulator.initialState = false;
            }
            // to loop the example 3D trajectory
            // live simulations will not have a final time
            if (isLastFrame) {
                simulariumController.gotoTime(0);
            }
            simulariumController.resume();
        } else {
            simulariumController.pause();
        }
    }, [isPlaying, simulariumController, clientSimulator, isLastFrame]);

    useEffect(() => {
        if (clientSimulator) {
            clientSimulator.setTimeScale(timeFactor);
        }
    }, [timeFactor, clientSimulator]);

    // Ongoing check to see if they've measured enough values to determine Kd
    const halfFilled = inputConcentration.A ? inputConcentration.A / 2 : 5;
    const uniqMeasuredConcentrations = useMemo(() => {
        const uniqInputs = [];
        const uniqOutputs = [];
        for (let i = 0; i < recordedInputConcentration.length; i++) {
            if (uniqInputs.indexOf(recordedInputConcentration[i]) === -1) {
                uniqInputs.push(recordedInputConcentration[i]);
                uniqOutputs.push(productEquilibriumConcentrations[i]);
            }
        }
        return uniqOutputs;
    }, [recordedInputConcentration, productEquilibriumConcentrations]);

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
    const canDetermineKd = useMemo(() => {
        return (
            hasAValueAboveKd &&
            hasAValueBelowKd &&
            uniqMeasuredConcentrations.length >= 3
        );
    }, [hasAValueAboveKd, hasAValueBelowKd, uniqMeasuredConcentrations]);
    const handleNewInputConcentration = useCallback(
        (name: string, value: number) => {
            if (value === 0) {
                // this is available on the slider, but we only want it visible
                // as an axis marker, not as a selection
                return;
            }
            if (!clientSimulator) {
                return;
            }
            // this is called when the user changes the slider
            // it updates the simulation to have the new value and clears
            // the collected data
            const agentName =
                name as keyof typeof LiveSimulationData.AVAILABLE_AGENTS;
            const agentId = LiveSimulationData.AVAILABLE_AGENTS[agentName].id;
            clientSimulator.changeConcentration(agentId, value);
            simulariumController.gotoTime(time + 1);
            resetCurrentRunAnalysisState();
        },
        [clientSimulator, time, simulariumController]
    );
    const totalReset = useCallback(() => {
        setLiveConcentration({
            [AgentName.A]:
                LiveSimulationData.INITIAL_CONCENTRATIONS[AgentName.A],
            [AgentName.B]:
                LiveSimulationData.INITIAL_CONCENTRATIONS[AgentName.B],
            [productName]: 0,
        });
        setCurrentModule(Module.A_B_AB);
        setInputConcentration({
            [AgentName.A]:
                LiveSimulationData.INITIAL_CONCENTRATIONS[AgentName.A],
            [AgentName.B]:
                LiveSimulationData.INITIAL_CONCENTRATIONS[AgentName.B],
        });
        handleNewInputConcentration(
            adjustableAgentName,
            LiveSimulationData.INITIAL_CONCENTRATIONS[AgentName.B]
        );
        setIsPlaying(false);
        clearAllAnalysisState();
        setTimeFactor(LiveSimulationData.INITIAL_TIME_FACTOR);
    }, [
        clearAllAnalysisState,
        handleNewInputConcentration,
        productName,
        adjustableAgentName,
    ]);
    // Special events in page navigation
    // usePageNumber takes a page number, a conditional and a callback

    // content[currentModule].length has one extra page for the 0th page so that
    // the page numbers line up with the index.
    const finalPageNumber = content[currentModule].length - 1;

    // clicked the home button
    usePageNumber(
        page,
        (page) =>
            page === 1 &&
            currentModule === 1 &&
            currentProductConcentrationArray.length > 1,
        () => {
            totalReset();
        }
    );

    // they have recorded a single value, changed the slider and pressed play
    usePageNumber(
        page,
        (page) =>
            page === PROMPT_TO_ADJUST_B &&
            isPlaying &&
            recordedInputConcentration.length > 0 &&
            recordedInputConcentration[0] !==
                inputConcentration[adjustableAgentName],
        () => {
            setPage(page + 1);
        }
    );

    useEffect(() => {
        const nextPage = content[currentModule][page + 1];
        if (!nextPage) {
            return;
        }
        const url = nextPage.trajectoryUrl;
        if (trajectoryStatus === TrajectoryStatus.INITIAL && url) {
            const changeTrajectory = async () => {
                setIsPlaying(false);
                setTrajectoryStatus(TrajectoryStatus.LOADING);
                totalReset();

                await fetch3DTrajectory(
                    url,
                    simulariumController,
                    setTrajectoryPlotData
                );
                setTrajectoryStatus(TrajectoryStatus.LOADED);
            };
            changeTrajectory();
        }
    }, [
        page,
        trajectoryStatus,
        currentModule,
        simulariumController,
        isPlaying,
        totalReset,
    ]);

    usePageNumber(
        page,
        (page) => page === finalPageNumber,
        () => {
            if (simulariumController.getFile()) {
                simulariumController.clearFile();
            }
        }
    );

    const addProductionTrace = (previousConcentration: number) => {
        const traces = productOverTimeTraces;
        if (currentProductConcentrationArray.length > 1) {
            const newTrace = {
                inputConcentration: previousConcentration,
                productConcentrations: currentProductConcentrationArray,
            };
            setProductOverTimeTraces([...traces, newTrace]);
            setCurrentProductConcentrationArray([]);
        }
    };

    // User input handlers

    const handleStartExperiment = () => {
        simulariumController.pause();
        totalReset();
        setTimeFactor(LiveSimulationData.DEFAULT_TIME_FACTOR);
        setPage(page + 1);
    };

    const handleTrajectoryChange = (trajectoryInfo: TrajectoryFileInfo) => {
        setTrajectoryName(trajectoryInfo.trajectoryTitle || "");
        if (trajectoryInfo.trajectoryTitle === LIVE_SIMULATION_NAME) {
            // 2d trajectory
            // switch to orthographic camera
            simulariumController.setCameraType(true);
            const { section } = content[currentModule][page];
            if (section === Section.Experiment) {
                setTimeFactor(LiveSimulationData.DEFAULT_TIME_FACTOR);
            } else {
                setTimeFactor(LiveSimulationData.INITIAL_TIME_FACTOR);
            }
            setFinalTime(-1);
        } else {
            // 3d trajectory
            // switch to perspective camera
            simulariumController.setCameraType(false);
            setTimeFactor(trajectoryInfo.timeStepSize);
            setFinalTime(
                trajectoryInfo.totalSteps * trajectoryInfo.timeStepSize
            );
        }
    };

    const handleTimeChange = (timeData: TimeData) => {
        const { time } = timeData;
        setTime(time);
        // can't use isLastFrame here because the time is not updated
        // in state yet
        if (finalTime > 0 && time >= finalTime - timeFactor && isPlaying) {
            setIsPlaying(false);
        }
        let concentrations: CurrentConcentration = {};
        let previousData = currentProductConcentrationArray;

        if (preComputedPlotDataManager) {
            if (timeData.time === 0) {
                // for the 3D trajectory,
                // we want to reset the data when we loop
                previousData = [];
            }
            preComputedPlotDataManager.update(timeData.time);
            concentrations =
                preComputedPlotDataManager.getCurrentConcentrations();
        } else if (clientSimulator) {
            concentrations = clientSimulator.getCurrentConcentrations(
                productName
            ) as CurrentConcentration;
        }
        const productConcentration = concentrations[productName];
        if (productConcentration !== undefined) {
            const newData = [...previousData, productConcentration];
            setCurrentProductConcentrationArray(newData);
        }
        setLiveConcentration(concentrations);
        if (timeData.time % 10 === 0 && clientSimulator) {
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

    const handleFinishInputConcentrationChange = (
        name: string,
        value: number
    ) => {
        // this is called when the user finishes dragging the slider
        // it stores the previous collected data and resets the live data
        const agentName = name as AgentName;
        const previousConcentration = inputConcentration[agentName] || 0;
        addProductionTrace(previousConcentration);
        setInputConcentration({ ...inputConcentration, [name]: value });
        setLiveConcentration({
            ...inputConcentration,
            [name]: value,
            [productName]: 0,
        });
    };

    const setEquilibriumFeedbackTimeout = (message: ReactNode | string) => {
        setEquilibriumFeedback(message);
        setTimeout(() => {
            setEquilibriumFeedback("");
        }, 3000);
    };

    const handleRecordEquilibrium = () => {
        if (!clientSimulator) {
            return false;
        }

        if (!clientSimulator.isMixed()) {
            setEquilibriumFeedbackTimeout("Not yet!");
            return false;
        }
        // this will always be defined for the current run, but since there are
        // different agents in each module, typescript fears it will be undefined
        const currentInputConcentration =
            inputConcentration[adjustableAgentName];
        if (currentInputConcentration === undefined) {
            return false;
        }
        const concentrations =
            clientSimulator.getCurrentConcentrations(productName);
        const productConcentration = concentrations[productName];
        const reactantConcentration = concentrations[adjustableAgentName];

        const currentTime = indexToTime(
            currentProductConcentrationArray.length,
            timeFactor,
            simulationData.timeUnit
        );
        const { newArray, index } = insertValueSorted(
            recordedReactantConcentrations,
            reactantConcentration
        );
        setRecordedReactantConcentration(newArray);
        updateArrayInState(
            productEquilibriumConcentrations,
            index,
            productConcentration,
            setProductEquilibriumConcentrations
        );
        updateArrayInState(
            recordedInputConcentration,
            index,
            currentInputConcentration,
            setRecordedInputConcentration
        );
        updateArrayInState(
            timeToReachEquilibrium,
            index,
            currentTime,
            setTimeToReachEquilibrium
        );
        const color =
            PLOT_COLORS[
                getColorIndex(
                    currentInputConcentration,
                    simulationData.getMaxConcentration(currentModule)
                )
            ];
        updateArrayInState(dataColors, index, color, setDataColors);
        setEquilibriumFeedbackTimeout(
            <>
                Great! <CheckCircleOutlined />
            </>
        );
    };

    const { totalMainContentPages } = useModule(currentModule);
    const lastPageOfExperiment = page === totalMainContentPages;

    return (
        <>
            <div className="app">
                <SimulariumContext.Provider
                    value={{
                        trajectoryName,
                        productName,
                        adjustableAgentName,
                        currentProductionConcentration:
                            liveConcentration[productName] || 0,
                        fixedAgentStartingConcentration:
                            inputConcentration[AgentName.A] || 0,
                        maxConcentration:
                            simulationData.getMaxConcentration(currentModule),
                        handleStartExperiment,
                        section: content[currentModule][page].section,
                        getAgentColor: simulationData.getAgentColor,
                        isPlaying,
                        setIsPlaying,
                        simulariumController,
                        handleTimeChange,
                        page,
                        module: currentModule,
                        setModule: setCurrentModule,
                        moduleLength: totalMainContentPages,
                        setPage,
                        timeFactor,
                        timeUnit: simulationData.timeUnit,
                        handleTrajectoryChange,
                        viewportSize,
                        setViewportSize,
                        recordedConcentrations: recordedInputConcentration,
                    }}
                >
                    <MainLayout
                        layout={content[currentModule][page].layout}
                        header={
                            <NavPanel
                                page={page}
                                title={moduleNames[currentModule]}
                                total={finalPageNumber}
                            />
                        }
                        content={
                            <ContentPanelTimer
                                pageContent={{
                                    ...content[currentModule][page],
                                    nextButton:
                                        (canDetermineKd &&
                                            content[currentModule][page]
                                                .section ===
                                                Section.Experiment) ||
                                        content[currentModule][page].nextButton,
                                    nextButtonText: lastPageOfExperiment
                                        ? "Finish"
                                        : content[currentModule][page]
                                              .nextButtonText,
                                }}
                                currentModule={currentModule}
                            />
                        }
                        reactionPanel={
                            <ReactionDisplay reactionType={currentModule} />
                        }
                        leftPanel={
                            <LeftPanel
                                inputConcentration={inputConcentration}
                                liveConcentration={liveConcentration}
                                handleNewInputConcentration={
                                    handleNewInputConcentration
                                }
                                handleFinishInputConcentrationChange={
                                    handleFinishInputConcentrationChange
                                }
                                bindingEventsOverTime={bindingEventsOverTime}
                                unbindingEventsOverTime={
                                    unBindingEventsOverTime
                                }
                                adjustableAgent={adjustableAgentName}
                            />
                        }
                        centerPanel={
                            <CenterPanel
                                kd={simulationData.getKd(currentModule)}
                                canDetermineEquilibrium={canDetermineKd}
                                overlay={
                                    content[currentModule][page].visualContent
                                }
                            />
                        }
                        rightPanel={
                            <RightPanel
                                showHelpPanel={
                                    equilibriumFeedback === "Not yet!"
                                }
                                productOverTimeTraces={productOverTimeTraces}
                                currentProductConcentrationArray={
                                    currentProductConcentrationArray
                                }
                                handleRecordEquilibrium={
                                    handleRecordEquilibrium
                                }
                                currentAdjustableAgentConcentration={
                                    inputConcentration[adjustableAgentName] || 0
                                }
                                equilibriumData={{
                                    inputConcentrations:
                                        recordedInputConcentration,
                                    reactantConcentrations:
                                        recordedReactantConcentrations,
                                    productConcentrations:
                                        productEquilibriumConcentrations,
                                    timeToEquilibrium: timeToReachEquilibrium,
                                    colors: dataColors,
                                    kd: simulationData.getKd(currentModule),
                                }}
                                equilibriumFeedback={equilibriumFeedback}
                            />
                        }
                    />
                    <AdminUI
                        totalPages={finalPageNumber}
                        timeFactor={timeFactor}
                        setTimeFactor={setTimeFactor}
                    />
                </SimulariumContext.Provider>
            </div>
        </>
    );
}

export default App;
