import { useEffect, useMemo, useState } from "react";
import { uniq } from "lodash";
import {
    InputConcentration,
    Module,
    ScatterTrace,
    TrajectoryStatus,
} from "../types";
import PreComputedSimulationData from "../simulation/PreComputedSimulationData";
import fetch3DTrajectory from "../utils/fetch3DTrajectory";
import { ProductOverTimeTrace } from "../components/plots/types";
import useCanDetermineEquilibrium from "./canDetermineEquilibrium";
import { SimulariumController } from "@aics/simularium-viewer";

const usePageNumber = (
    page: number,
    setIsPlaying: (value: boolean) => void,
    totalReset: () => void,
    inputConcentration: InputConcentration,
    resetAnalysisState: () => void,
    setTrajectoryPlotData: (value: ScatterTrace[]) => void,
    setProductOverTimeTraces: (value: ProductOverTimeTrace[]) => void,
    recordedConcentrations: number[],
    simulariumController: SimulariumController | null,
    currentProductConcentrationArray: number[],
    currentModule: Module,
    setPage: (value: number) => void,
    isPlaying: boolean
) => {
    const [trajectoryStatus, setTrajectoryStatus] = useState(
        TrajectoryStatus.INITIAL
    );
    const uniqMeasuredConcentrations = useMemo(
        () => uniq(recordedConcentrations),
        [recordedConcentrations]
    );
    const canDetermineEquilibrium = useCanDetermineEquilibrium(
        inputConcentration,
        uniqMeasuredConcentrations
    );

    useEffect(() => {
        const fetchData = async () => {
            if (!simulariumController) {
                return;
            }
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
        };
        switch (page) {
            case 1:
                if (currentProductConcentrationArray.length > 1) {
                    totalReset();
                }
                break;
            case 4:
                if (uniqMeasuredConcentrations.length > 0 && !isPlaying) {
                    setPage(5);
                }
                break;
            case 5:
                setIsPlaying(false);
                break;
            case 7:
                if (canDetermineEquilibrium) {
                    setPage(8);
                }
                break;
            case 9:
                if (trajectoryStatus === TrajectoryStatus.INITIAL) {
                    fetchData();
                }
                break;
            default:
                break;
        }
    }, [
        page,
        totalReset,
        currentProductConcentrationArray,
        isPlaying,
        uniqMeasuredConcentrations.length,
        setIsPlaying,
        canDetermineEquilibrium,
        trajectoryStatus,
        simulariumController,
        setPage,
        resetAnalysisState,
        currentModule,
        setTrajectoryPlotData,
        setProductOverTimeTraces,
    ]);
};

export default usePageNumber;
