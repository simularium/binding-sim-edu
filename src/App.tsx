import { ReactNode, useEffect, useMemo, useState } from "react";
import { uniq } from "lodash";
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
    TrajectoryStatus,
} from "./types";
import LeftPanel from "./components/main-layout/LeftPanel";
import RightPanel from "./components/main-layout/RightPanel";
import ReactionDisplay from "./components/main-layout/ReactionDisplay";
import ContentPanel from "./components/main-layout/ContentPanel";
import content, { moduleNames } from "./content";
import { DEFAULT_VIEWPORT_SIZE, LIVE_SIMULATION_NAME } from "./constants";
import CenterPanel from "./components/main-layout/CenterPanel";
import { SimulariumContext } from "./simulation/context";
import NavPanel from "./components/main-layout/NavPanel";
import AdminUI from "./components/AdminUi";
import { ProductOverTimeTrace } from "./components/plots/types";
import MainLayout from "./components/main-layout/Layout";
import usePageNumber from "./hooks/usePageNumber";
import fetch3DTrajectory from "./utils/fetch3DTrajectory";
import { insertIntoArray, insertValueSorted } from "./utils";
import PreComputedPlotData from "./simulation/PreComputedPlotData";
import PreComputedSimulationData from "./simulation/PreComputedSimulationData";
import LiveSimulationData from "./simulation/LiveSimulationData";

const ADJUSTABLE_AGENT = AgentName.B;

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
        LiveSimulationData.DEFAULT_TIME_FACTOR
    );
    const [viewportSize, setViewportSize] = useState(DEFAULT_VIEWPORT_SIZE);
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
        const activeAgents = simulationData.getActiveAgents(currentModule);
        setInputConcentration(
            simulationData.getInitialConcentrations(activeAgents)
        );
        resetAnalysisState();
        const trajectory =
            simulationData.createAgentsFromConcentrations(activeAgents);
        if (!trajectory) {
            return null;
        }
        return new BindingSimulator(trajectory, viewportSize.width / 5);
    }, [currentModule, viewportSize, simulationData]);

    const preComputedPlotDataManager = useMemo(() => {
        if (!trajectoryPlotData) {
            return null;
        }
        return new PreComputedPlotData(trajectoryPlotData);

    }, [trajectoryPlotData]);

    const totalReset = () => {
        setLiveConcentration({
            [AgentName.A]: INITIAL_CONCENTRATIONS[AgentName.A],
            [AgentName.B]: INITIAL_CONCENTRATIONS[AgentName.B],
            [productName]: 0,
        });
        setCurrentModule(Module.A_B_AB);
        setInputConcentration({
            [AgentName.A]: INITIAL_CONCENTRATIONS[AgentName.A],
            [AgentName.B]: INITIAL_CONCENTRATIONS[AgentName.B],
        });
        handleNewInputConcentration(
            ADJUSTABLE_AGENT,
            INITIAL_CONCENTRATIONS[AgentName.B]
        );
        setIsPlaying(false);
        resetAnalysisState();
        setInputEquilibriumConcentrations([]);
        setProductEquilibriumConcentrations([]);
    };

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

    const finalPageNumber = content[currentModule].length - 1; // -1 for the 0-index
    usePageNumber(
        page,
        (page) => page === 1 && currentProductConcentrationArray.length > 1,
        () => {
            totalReset();
        }
    );


    usePageNumber(
        page,
        (page) => page === 5,
        () => setIsPlaying(false)
    );

    // if they hit pause instead of clicking "Next", we still want to progress
    usePageNumber(
        page,
        (page) =>
            page === 4 && uniqMeasuredConcentrations.length > 0 && !isPlaying,
        () => setPage(5)
    );
    usePageNumber(
        page,
        (page) => canDetermineEquilibrium && page === 7,
        () => setPage(8)
    );

    usePageNumber(
        page,
        (page) =>
            page === finalPageNumber - 1 &&
            trajectoryStatus == TrajectoryStatus.INITIAL,
        async () => {
            setIsPlaying(false);
            setTrajectoryStatus(TrajectoryStatus.LOADING);
            resetAnalysisState();
            await fetch3DTrajectory(
                PreComputedSimulationData.EXAMPLE_TRAJECTORY_URLS[
                    currentModule
                ],
                simulariumController,
                setTrajectoryPlotData
            );
            setProductOverTimeTraces([]);
            setTrajectoryStatus(TrajectoryStatus.LOADED);
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

    const handleTrajectoryChange = (trajectoryInfo: TrajectoryFileInfo) => {
        setTrajectoryName(trajectoryInfo.trajectoryTitle || "");
        if (trajectoryInfo.trajectoryTitle === LIVE_SIMULATION_NAME) {
            // 2d trajectory
            // switch to orthographic camera
            simulariumController.setCameraType(true);
            setTimeFactor(LiveSimulationData.DEFAULT_TIME_FACTOR);
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

    const handleNewInputConcentration = (name: string, value: number) => {
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
        resetAnalysisState();
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
        const productConcentration =
            clientSimulator.getCurrentConcentrations(productName)[productName];
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
                        trajectoryName,
                        productName,
                        currentProductionConcentration:
                            liveConcentration[productName] || 0,
                        maxConcentration:
                            simulationData.getMaxConcentration(currentModule),
                        getAgentColor: simulationData.getAgentColor,
                        isPlaying,
                        setIsPlaying,
                        simulariumController,
                        handleTimeChange,
                        page,
                        setPage,
                        timeFactor,
                        timeUnit: simulationData.timeUnit,
                        handleTrajectoryChange,
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
                                total={finalPageNumber}
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
                                adjustableAgent={ADJUSTABLE_AGENT}
                            />
                        }
                        centerPanel={
                            <CenterPanel
                                reactionType={currentModule}
                                hasProgressed={
                                    currentProductConcentrationArray.length > 1
                                }
                            />
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
