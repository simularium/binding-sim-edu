import { useEffect, useMemo, useState } from "react";

import "./App.css";
import Viewer from "./components/Viewer";
import { SimulariumController } from "@aics/simularium-viewer";
import BindingSimulator from "./BindingSimulator2D";
import {
    AVAILABLE_AGENTS,
    createAgentsFromConcentrations,
    trajectories,
} from "./constants/trajectories";
import Concentration from "./components/Concentration";
import { AvailableAgentNames } from "./types";
import Slider from "./components/Slider";
import Plot from "./components/Plot";

const INITIAL_CONCENTRATIONS = { A: 10, B: 10, C: 10 };

function App() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [inputConcentration, setInputConcentration] = useState(INITIAL_CONCENTRATIONS);
    const [timeFactor, setTimeFactor] = useState(30);
    const [productOverTime, setProductOverTime] = useState({
        [inputConcentration[AvailableAgentNames.B]]: [0],
    });
    const [activeAgents, setActiveAgents] = useState([
        AvailableAgentNames.A,
        AvailableAgentNames.B,
    ]);

    const simulariumController = useMemo(() => {
        return new SimulariumController({});
    }, []);

    const clientSimulator = useMemo(() => {
        const trajectory = createAgentsFromConcentrations(
            activeAgents,
            INITIAL_CONCENTRATIONS
        );
        return new BindingSimulator(trajectory);
    }, [activeAgents]);

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
            <div className="viewer">
                <button
                    onClick={() => {
                        setIsPlaying(!isPlaying);
                    }}
                >
                    {isPlaying ? "Pause" : "Play"}
                </button>
                <Slider
                    min={0}
                    max={100}
                    initialValue={timeFactor}
                    onChange={(_, value) => {
                        setTimeFactor(value);
                    }}
                    disabled={false}
                    name="time factor (ns)"
                />
                <Concentration
                    activeAgents={activeAgents}
                    concentration={inputConcentration}
                    onChange={handleNewInputConcentration}
                    disabled={isPlaying}
                />
                <select
                    onChange={(e) =>
                        setActiveAgents(
                            e.target.value.split(",") as AvailableAgentNames[]
                        )
                    }
                    defaultValue={trajectories[0]}
                >
                    <option value={trajectories[0]}>High affinity</option>
                    <option value={trajectories[1]}>Low affinity</option>
                    <option value={trajectories[2]}>Competitive</option>
                </select>
                <div style={{ display: "flex" }}>
                    <Viewer
                        controller={simulariumController}
                        handleTimeChange={handleTimeChange}
                    />
                    <Plot data={productOverTime} />
                </div>
            </div>
        </>
    );
}

export default App;
