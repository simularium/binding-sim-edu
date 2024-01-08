import React, { useEffect, useMemo, useState } from "react";

import "./App.css";
import Viewer from "./components/Viewer";
import { SimulariumController } from "@aics/simularium-viewer";
import BindingSimulator from "./BindingSimulator2D";

function App() {
    const [isPlaying, setIsPlaying] = useState(false);
    const simulariumController = useMemo(() => {
        return new SimulariumController({});
    }, []);

    useEffect(() => {
        simulariumController.setCameraType(true);
        simulariumController.changeFile(
            {
                clientSimulator: new BindingSimulator([
                    { id: 0, count: 30, radius: 3, partners: [1, 2] },
                    {
                        id: 1,
                        count: 300,
                        radius: 0.7,
                        partners: [0],
                        kOn: 0.1,
                        kOff: 0.5,
                    },
                    // { id: 2, count: 80, radius: 1.5, partners: [0], kOn: 0.1, kOff: 0.1},
                ]),
            },
            "binding-simulator"
        );
    }, [simulariumController]);

    useEffect(() => {
        if (isPlaying) {
            simulariumController.resume();
        } else {
            simulariumController.pause();
        }
    }, [isPlaying, simulariumController]);
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
                <Viewer controller={simulariumController} />
            </div>
        </>
    );
}

export default App;
