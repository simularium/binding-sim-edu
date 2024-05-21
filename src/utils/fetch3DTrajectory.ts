import {
    SimulariumController,
    loadSimulariumFile,
} from "@aics/simularium-viewer";
import { ScatterTrace } from "../types";

const fetch3DTrajectory = async (
    url: string,
    simulariumController: SimulariumController,
    setTrajectoryPlotData: (plotData: ScatterTrace[]) => void
) => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const blob = await response.blob();
            const simulariumFile = await loadSimulariumFile(blob);
            const plotData = simulariumFile.getPlotData();
            console.log(plotData);
            setTrajectoryPlotData(plotData[0].data as ScatterTrace[]); // we're not using histograms
            await simulariumController.changeFile(
                {
                    simulariumFile: simulariumFile,
                },
                "example"
            );
        } else {
            throw new Error(`Failed to fetch - ${response.status}`);
        }
    } catch (error) {
        console.log(error);
    }
};

export default fetch3DTrajectory;
