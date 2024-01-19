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

const INITIAL_CONCENTRATIONS = { A: 10, B: 10, C: 0 };
function App() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [concentration, setConcentration] = useState(INITIAL_CONCENTRATIONS);

    const [activeAgents, setActiveAgents] = useState([
        AvailableAgentNames.A,
        AvailableAgentNames.B,
    ]);
    const simulariumController = useMemo(() => {
        return new SimulariumController({});
    }, []);

    const clientSimulator = useMemo(() => {
        const trajectory = createAgentsFromConcentrations(activeAgents, {
            A: 10,
            B: 10,
            C: 0,
        });
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
    }, [isPlaying, simulariumController]);

    const handleConcentrationChange = (
        name: AvailableAgentNames,
        value: number
    ) => {
        const agentId = AVAILABLE_AGENTS[name].id;
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
                <Concentration
                    agents={concentration}
                    onChange={handleConcentrationChange}
                />
                <select
                    onChange={(e) => setActiveAgents(e.target.value.split(","))}
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
