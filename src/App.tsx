import {
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
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
    InitialCondition,
    InputConcentration,
    LayoutType,
    Module,
    ProductName,
    ScatterTrace,
    Section,
    TrajectoryStatus,
    ViewType,
} from "./types";
import LeftPanel from "./components/main-layout/LeftPanel";
import RightPanel from "./components/main-layout/RightPanel";
import ReactionDisplay from "./components/main-layout/ReactionDisplay";
import ContentPanelTimer from "./components/main-layout/ContentPanelTimer";
import content, { FIRST_PAGE, moduleNames } from "./content";
import { DEFAULT_VIEWPORT_SIZE, LIVE_SIMULATION_NAME } from "./constants";
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
    isSlopeZero,
    updateArrayInState,
} from "./utils";
import PreComputedPlotData from "./simulation/PreComputedPlotData";
import PreComputedSimulationData from "./simulation/PreComputedSimulationData";
import LiveSimulationData from "./simulation/LiveSimulationData";
import { PLOT_COLORS } from "./components/plots/constants";
import useModule from "./hooks/useModule";
import LandingPage from "./components/LandingPage";

function App() {
    const [currentView, setCurrentView] = useState<ViewType>(ViewType.Lab);
    const [page, setPage] = useState(FIRST_PAGE[Module.A_B_AB]);
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
                LiveSimulationData.INITIAL_CONCENTRATIONS[Module.A_B_AB][
                    AgentName.A
                ],
            [AgentName.B]:
                LiveSimulationData.INITIAL_CONCENTRATIONS[Module.A_B_AB][
                    AgentName.B
                ],
        });
    const [timeFactor, setTimeFactor] = useState(
        LiveSimulationData.INITIAL_TIME_FACTOR
    );

    const [completedModules, setCompletedModules] = useState<Set<Module>>(
        new Set()
    );
    const [viewportSize, setViewportSize] = useState(DEFAULT_VIEWPORT_SIZE);
    const adjustableAgentName =
        LiveSimulationData.ADJUSTABLE_AGENT_MAP[currentModule];
    /**
     * Analysis state
     * used to create plots and feedback
     */
    const [preComputedTrajectoryPlotData, setPreComputedTrajectoryPlotData] =
        useState<ScatterTrace[]>();
    const [liveConcentration, setLiveConcentration] =
        useState<CurrentConcentration>({
            [AgentName.A]:
                LiveSimulationData.INITIAL_CONCENTRATIONS[Module.A_B_AB][
                    AgentName.A
                ],
            [AgentName.B]:
                LiveSimulationData.INITIAL_CONCENTRATIONS[Module.A_B_AB][
                    AgentName.B
                ],
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

    const resetCurrentRunAnalysisState = useCallback(() => {
        setBindingEventsOverTime([]);
        setUnBindingEventsOverTime([]);
        setCurrentProductConcentrationArray([]);
    }, []);

    const clearAllAnalysisState = useCallback(() => {
        resetCurrentRunAnalysisState();
        setRecordedInputConcentration([]);
        setProductOverTimeTraces([]);
        setRecordedReactantConcentration([]);
        setTimeToReachEquilibrium([]);
        setDataColors([]);
    }, [resetCurrentRunAnalysisState]);

    const isPassedEquilibrium = useRef(false);
    const arrayLength = currentProductConcentrationArray.length;
    if (
        !isPassedEquilibrium.current &&
        arrayLength > 0 &&
        arrayLength % 50 === 0
    ) {
        isPassedEquilibrium.current = isSlopeZero(
            currentProductConcentrationArray,
            timeFactor
        );
    } else if (arrayLength === 0 && isPassedEquilibrium.current) {
        isPassedEquilibrium.current = false;
    }

    // SIMULATION INITIALIZATION
    const simulariumController = useMemo(() => {
        return new SimulariumController({});
    }, []);

    const sectionType = content[currentModule][page].section;

    const clientSimulator = useMemo(() => {
        const activeAgents = simulationData.getActiveAgents(currentModule);
        setInputConcentration(
            simulationData.getInitialConcentrations(
                activeAgents,
                currentModule,
                sectionType === Section.Experiment
            )
        );
        resetCurrentRunAnalysisState();
        const trajectory = simulationData.createAgentsFromConcentrations(
            activeAgents,
            currentModule,
            sectionType === Section.Experiment
        );
        if (!trajectory) {
            return null;
        }
        const longestAxis = Math.max(viewportSize.width, viewportSize.height);
        const startMixed = sectionType !== Section.Introduction;
        return new BindingSimulator(
            trajectory,
            longestAxis / 3,
            startMixed ? InitialCondition.RANDOM : InitialCondition.SORTED
        );
    }, [
        simulationData,
        currentModule,
        resetCurrentRunAnalysisState,
        viewportSize.width,
        viewportSize.height,
        sectionType,
    ]);

    const preComputedPlotDataManager = useMemo(() => {
        if (!preComputedTrajectoryPlotData) {
            return null;
        }
        return new PreComputedPlotData(preComputedTrajectoryPlotData);
    }, [preComputedTrajectoryPlotData]);

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

    const addProductionTrace = useCallback(
        (previousConcentration: number) => {
            const traces = productOverTimeTraces;
            if (currentProductConcentrationArray.length > 1) {
                const newTrace = {
                    inputConcentration: previousConcentration,
                    productConcentrations: currentProductConcentrationArray,
                };
                setProductOverTimeTraces([...traces, newTrace]);
                setCurrentProductConcentrationArray([]);
            }
        },
        [currentProductConcentrationArray, productOverTimeTraces]
    );

    const setExperiment = () => {
        setIsPlaying(false);

        const activeAgents = simulationData.getActiveAgents(currentModule);
        const concentrations = simulationData.getInitialConcentrations(
            activeAgents,
            currentModule,
            true
        );
        clientSimulator?.mixAgents();
        setTimeFactor(LiveSimulationData.INITIAL_TIME_FACTOR);
        setInputConcentration(concentrations);
        setLiveConcentration(concentrations);
    };

    const handleMixAgents = useCallback(() => {
        if (clientSimulator) {
            setIsPlaying(false);
            clientSimulator.mixAgents();
            simulariumController.gotoTime(1);
        }
    }, [clientSimulator, simulariumController]);

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
            clientSimulator.changeConcentration(
                agentId,
                value,
                sectionType === Section.Experiment
                    ? InitialCondition.RANDOM
                    : InitialCondition.SORTED
            );
            simulariumController.gotoTime(1); // the number isn't used, but it triggers the update
            const previousConcentration = inputConcentration[agentName] || 0;
            addProductionTrace(previousConcentration);
            resetCurrentRunAnalysisState();
        },
        [
            clientSimulator,
            simulariumController,
            inputConcentration,
            addProductionTrace,
            resetCurrentRunAnalysisState,
            sectionType,
        ]
    );
    const totalReset = useCallback(() => {
        setCurrentView(ViewType.Lab);
        const activeAgents = [AgentName.A, AgentName.B];
        setCurrentModule(Module.A_B_AB);
        const concentrations = simulationData.getInitialConcentrations(
            activeAgents,
            Module.A_B_AB
        );
        setLiveConcentration({
            [AgentName.A]: concentrations[AgentName.A],
            [AgentName.B]: concentrations[AgentName.B],
            [productName]: 0,
        });
        setCurrentModule(Module.A_B_AB);
        setInputConcentration({
            [AgentName.A]: concentrations[AgentName.A],
            [AgentName.B]: concentrations[AgentName.B],
        });
        handleNewInputConcentration(
            adjustableAgentName,
            concentrations[AgentName.B] ??
                LiveSimulationData.INITIAL_CONCENTRATIONS[Module.A_B_AB][
                    AgentName.B
                ]
        );
        setIsPlaying(false);
        clearAllAnalysisState();
        setTimeFactor(LiveSimulationData.INITIAL_TIME_FACTOR);
    }, [
        clearAllAnalysisState,
        handleNewInputConcentration,
        productName,
        adjustableAgentName,
        simulationData,
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
    const hasRecordedFirstValue = useRef(false);
    // they have recorded a single value, changed the slider and pressed play
    usePageNumber(
        page,
        () =>
            currentModule === Module.A_B_AB &&
            !hasRecordedFirstValue.current &&
            isPlaying &&
            recordedInputConcentration.length === 1 &&
            recordedInputConcentration[0] !==
                inputConcentration[adjustableAgentName],
        () => {
            hasRecordedFirstValue.current = true;
            setPage(page + 1);
        }
    );

    const switchToLiveSimulation = useCallback(
        (layout: LayoutType) => {
            if (trajectoryStatus === TrajectoryStatus.LOADED) {
                simulariumController.clearFile();
                setTrajectoryStatus(TrajectoryStatus.INITIAL);
            }
            if (
                layout === LayoutType.LiveSimulation &&
                simulariumController.getFile() !== LIVE_SIMULATION_NAME
            ) {
                // if we are on a live simulation page, and the file is not the live simulation
                // load the live simulation
                setTrajectoryName(LIVE_SIMULATION_NAME);
            }
        },
        [simulariumController, trajectoryStatus]
    );

    // handle trajectory changes based on content changes
    useEffect(() => {
        const currentPage = content[currentModule][page];
        const nextPage = content[currentModule][page + 1];
        if (!nextPage?.trajectoryUrl && !currentPage.trajectoryUrl) {
            // if there is not a precomputed on this or the next page,
            // clear any precomputed trajectory and load a liveSim if necessary
            switchToLiveSimulation(currentPage.layout);
        } else {
            // The preference is request the precomputed trajectory while on the
            // previous page so it's already loaded when the user gets to the page
            const url = nextPage.trajectoryUrl || currentPage.trajectoryUrl;

            if (trajectoryStatus === TrajectoryStatus.INITIAL && url) {
                const changeTrajectory = async () => {
                    setIsPlaying(false);
                    simulariumController.clearFile();
                    setTrajectoryStatus(TrajectoryStatus.LOADING);
                    clearAllAnalysisState();

                    await fetch3DTrajectory(
                        url,
                        simulariumController,
                        setPreComputedTrajectoryPlotData
                    );
                    setTrajectoryStatus(TrajectoryStatus.LOADED);
                };
                changeTrajectory();
            }
        }
    }, [
        page,
        trajectoryStatus,
        currentModule,
        simulariumController,
        isPlaying,
        totalReset,
        switchToLiveSimulation,
        clearAllAnalysisState,
    ]);

    const { section } = content[currentModule][page];
    useEffect(() => {
        if (section === Section.Experiment) {
            setTimeFactor(LiveSimulationData.DEFAULT_TIME_FACTOR);
        } else if (section === Section.Introduction) {
            setTimeFactor(LiveSimulationData.INITIAL_TIME_FACTOR);
        }
    }, [section]);

    // User input handlers

    const addCompletedModule = (module: Module) => {
        setCompletedModules((prev: Set<Module>) => new Set(prev).add(module));
    };

    const setModule = (module: Module) => {
        setPage(FIRST_PAGE[module]);
        clearAllAnalysisState();
        setCurrentModule(module);
        setIsPlaying(false);
        // the first module is the only one that starts with the lab view
        if (module === Module.A_B_AB) {
            setCurrentView(ViewType.Lab);
        } else {
            setCurrentView(ViewType.Simulation);
        }
    };

    const handleStartExperiment = () => {
        clearAllAnalysisState();
        setExperiment();
        setPage(page + 1);
    };

    // trigger when the trajectory data has been sent by the viewer
    const handleTrajectoryChange = (trajectoryInfo: TrajectoryFileInfo) => {
        setTrajectoryName(trajectoryInfo.trajectoryTitle || "");
        if (trajectoryInfo.trajectoryTitle === LIVE_SIMULATION_NAME) {
            // 2d trajectory
            // switch to orthographic camera
            simulariumController.setCameraType(true);
            setPreComputedTrajectoryPlotData(undefined);
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

    const handleSwitchView = () => {
        setCurrentView((prevView) =>
            prevView === ViewType.Lab ? ViewType.Simulation : ViewType.Lab
        );
    };

    const handleRecordEquilibrium = () => {
        if (!clientSimulator) {
            return false;
        }

        if (!isPassedEquilibrium.current) {
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
                        adjustableAgentName,
                        currentProductionConcentration:
                            liveConcentration[productName] || 0,
                        fixedAgentStartingConcentration:
                            inputConcentration[AgentName.A] || 0,
                        getAgentColor: simulationData.getAgentColor,
                        handleMixAgents,
                        handleStartExperiment,
                        handleTimeChange,
                        handleTrajectoryChange,
                        isPlaying,
                        maxConcentration:
                            simulationData.getMaxConcentration(currentModule),
                        module: currentModule,
                        page,
                        productName,
                        progressionElement:
                            content[currentModule][page].progressionElement ||
                            "",
                        quizQuestion:
                            content[currentModule][page].quizQuestion || "",
                        recordedConcentrations: recordedInputConcentration,
                        section: content[currentModule][page].section,
                        setIsPlaying,
                        setModule,
                        setPage,
                        setViewportSize,
                        setViewportType: handleSwitchView,
                        simulariumController,
                        timeFactor,
                        timeUnit: simulationData.timeUnit,
                        trajectoryName,
                        viewportSize,
                        viewportType: currentView,
                        addCompletedModule,
                        completedModules,
                    }}
                >
                    <MainLayout
                        centerPanel={
                            <CenterPanel
                                kd={simulationData.getKd(currentModule)}
                                canDetermineEquilibrium={canDetermineKd}
                                overlay={
                                    content[currentModule][page].visualContent
                                }
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
                        header={
                            <NavPanel
                                page={page}
                                title={moduleNames[currentModule]}
                                total={finalPageNumber}
                            />
                        }
                        landingPage={
                            <LandingPage
                                {...content[currentModule][page]}
                                module={currentModule}
                            />
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
                        reactionPanel={
                            <ReactionDisplay reactionType={currentModule} />
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
                        section={content[currentModule][page].section}
                        layout={content[currentModule][page].layout}
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
