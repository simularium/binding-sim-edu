import React, { useEffect, useMemo, useState } from "react";

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

const INITIAL_CONCENTRATIONS = { A: 10, B: 10, C: 0 };
function App() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [concentration, setConcentration] = useState(INITIAL_CONCENTRATIONS);
    const [timeFactor, setTimeFactor] = useState(25);
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

    const handleConcentrationChange = (
        name: string,
        value: number
    ) => {
        const agentName = name as AvailableAgentNames;
        const agentId = AVAILABLE_AGENTS[agentName].id;
        clientSimulator.changeConcentration(agentId, value);
        setConcentration({ ...concentration, [name]: value });
        const time = simulariumController.time();
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
                    onChange={(name, value) => {
                        setTimeFactor(value);
                    }}
                    name="time factor (ns)"
                />
                <Concentration
                    agents={concentration}
                    onChange={handleConcentrationChange}
                />
                <select
                    onChange={(e) => setActiveAgents(e.target.value.split(",") as AvailableAgentNames[])}
                    defaultValue={trajectories[0]}
                >
                    <option value={trajectories[0]}>Low affinity</option>
                    <option value={trajectories[1]}>High affinity</option>
                    <option value={trajectories[2]}>Competitive</option>
                </select>

                <Viewer controller={simulariumController} />
            </div>
        </>
    );
}

export default App;
