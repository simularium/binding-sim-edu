import { ReactNode, useEffect, useMemo, useState } from "react";
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
} from "./types";
import LeftPanel from "./components/main-layout/LeftPanel";
import RightPanel from "./components/main-layout/RightPanel";
import ReactionDisplay from "./components/main-layout/ReactionDisplay";
import ContentPanel from "./components/main-layout/ContentPanel";
import content from "./content";
import { LIVE_SIMULATION_NAME } from "./constants";
import CenterPanel from "./components/main-layout/CenterPanel";
import {
    AnalysisContext,
    AppContext,
    SimulariumContext,
    LiveEventsContext,
} from "./context";
import NavPanel from "./components/main-layout/NavPanel";
import AdminUI from "./components/AdminUi";
import { ProductOverTimeTrace } from "./components/plots/types";
import MainLayout from "./components/main-layout/Layout";
import { insertIntoArray, insertValueSorted } from "./utils";
import PreComputedPlotData from "./simulation/PreComputedPlotData";
import PreComputedSimulationData from "./simulation/PreComputedSimulationData";
import LiveSimulationData from "./simulation/LiveSimulationData";
import usePageNumber from "./hooks/usePageNumber";
import { DEFAULT_APP_STATE } from "./context/App/default";
import DEFAULT_SIMULARIUM_STATE from "./context/Simularium/default";
import { DEFAULT_INPUT_CONCENTRATION } from "./context/Analysis/default";
import LIVE_EVENTS_DEFAULT_STATE from "./context/LiveEvents/default";

const ADJUSTABLE_AGENT = AgentName.B;

function App() {
    const [page, setPage] = useState(DEFAULT_APP_STATE.page);
    const [hasProgressed, setHasProgressed] = useState(
        DEFAULT_APP_STATE.hasProgressed
    );
    const [time, setTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(
        DEFAULT_SIMULARIUM_STATE.isPlaying
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
    const [currentModule, setCurrentModule] = useState(
        DEFAULT_APP_STATE.currentModule
    );
    const [finalTime, setFinalTime] = useState(-1);
    const productName: ProductName = useMemo(() => {
        return simulationData.getCurrentProduct(currentModule);
    }, [currentModule, simulationData]);

    const [inputConcentration, setInputConcentration] =
        useState<InputConcentration>(DEFAULT_INPUT_CONCENTRATION);
    const [timeFactor, setTimeFactor] = useState(
        DEFAULT_SIMULARIUM_STATE.timeFactor
    );
    const [viewportSize, setViewportSize] = useState(
        DEFAULT_SIMULARIUM_STATE.viewportSize
    );
    /**
     * Analysis state
     * used to create plots and feedback
     */
    const [trajectoryPlotData, setTrajectoryPlotData] =
        useState<ScatterTrace[]>();
    const [liveConcentration, setLiveConcentration] =
        useState<CurrentConcentration>(
            LIVE_EVENTS_DEFAULT_STATE.liveConcentration
        );
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
            ADJUSTABLE_AGENT,
            LiveSimulationData.INITIAL_CONCENTRATIONS[AgentName.B]
        );
        setHasProgressed(false);
        setIsPlaying(false);
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

    usePageNumber(
        page,
        setIsPlaying,
        totalReset,
        inputConcentration,
        resetAnalysisState,
        setTrajectoryPlotData,
        setProductOverTimeTraces,
        inputEquilibriumConcentrations,
        simulariumController,
        currentProductConcentrationArray,
        currentModule,
        setPage,
        isPlaying,
        setHasProgressed
    );

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
            <AppContext.Provider
                value={{ page, setPage, currentModule, hasProgressed }}
            >
                <div className="app">
                    <SimulariumContext.Provider
                        value={{
                            trajectoryName,
                            productName,
                            maxConcentration:
                                simulationData.getMaxConcentration(
                                    currentModule
                                ),
                            getAgentColor: simulationData.getAgentColor,
                            isPlaying,
                            setIsPlaying,
                            simulariumController,
                            handleTimeChange,
                            timeFactor,
                            timeUnit: simulationData.timeUnit,
                            handleTrajectoryChange,
                            viewportSize,
                            setViewportSize,
                        }}
                    >
                        <MainLayout
                            header={<NavPanel />}
                            content={
                                <ContentPanel
                                    {...content[currentModule][page]}
                                />
                            }
                            reactionPanel={<ReactionDisplay />}
                            leftPanel={
                                <LiveEventsContext.Provider
                                    value={{
                                        recordedConcentrations:
                                            inputEquilibriumConcentrations,
                                        liveConcentration,
                                        handleNewInputConcentration,
                                        handleFinishInputConcentrationChange,
                                        bindingEventsOverTime,
                                        unBindingEventsOverTime,
                                    }}
                                >
                                    <LeftPanel
                                        inputConcentration={inputConcentration}
                                        adjustableAgent={ADJUSTABLE_AGENT}
                                    />
                                </LiveEventsContext.Provider>
                            }
                            centerPanel={
                                <CenterPanel
                                    currentProductConcentration={
                                        liveConcentration[productName] || 0
                                    }
                                />
                            }
                            rightPanel={
                                <AnalysisContext.Provider
                                    value={{
                                        currentProductConcentrationArray:
                                            currentProductConcentrationArray,
                                        productOverTimeTraces:
                                            productOverTimeTraces,
                                        handleRecordEquilibrium:
                                            handleRecordEquilibrium,
                                        equilibriumConcentrations: {
                                            inputConcentrations:
                                                inputEquilibriumConcentrations,
                                            productConcentrations:
                                                productEquilibriumConcentrations,
                                        },
                                    }}
                                >
                                    <RightPanel
                                        currentAdjustableAgentConcentration={
                                            inputConcentration[
                                                ADJUSTABLE_AGENT
                                            ] || 0
                                        }
                                        equilibriumFeedback={
                                            equilibriumFeedback
                                        }
                                    />
                                </AnalysisContext.Provider>
                            }
                        />
                        <AdminUI
                            timeFactor={timeFactor}
                            setTimeFactor={setTimeFactor}
                        />
                    </SimulariumContext.Provider>
                </div>
            </AppContext.Provider>
        </>
    );
}

export default App;
