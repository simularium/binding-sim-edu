import React, { useContext, useState } from 'react';
import Viewer from './Viewer';
import { SimulariumContext } from '../simulation/context';
import ProgressionControl from './ProgressionControl';

enum View {
    Lab = 'lab',
    Simulation = 'simulation',
}

const ViewSwitch: React.FC = () => {
    const [currentView, setCurrentView] = useState<View>(View.Lab);

    const switchView = () => {
        setCurrentView((prevView) =>
            prevView === View.Lab ? View.Simulation : View.Lab
        );
    };
    const {
        isPlaying,
        setIsPlaying,
        simulariumController,
        handleTimeChange,
    } = useContext(SimulariumContext);
    if (!simulariumController) {
        return null;
    }
    return (
        <>
            <ProgressionControl onPage={1}>

                <button onClick={switchView}>
                    Switch to {currentView === View.Lab ? "Simulation" : "Lab"} View
                </button>
            </ProgressionControl>
            {currentView === View.Lab ? (
                <LabView />
            ) : null}

            <Viewer
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                controller={simulariumController}
                handleTimeChange={handleTimeChange}
            />
            
        </>
    );
};

const LabView: React.FC = () => {
    return <div style={{position: "absolute", height: "100%", width: "100%", background: "black", zIndex:300}}>
        <h1>Lab View</h1>
    </div>;
};

export default ViewSwitch;