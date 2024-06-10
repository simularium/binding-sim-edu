import { useContext, useEffect, useMemo, useState } from "react";
import { uniq } from "lodash";
import { AppContext, SimulariumContext } from "../context/context";
import { TrajectoryStatus } from "../types";
import PreComputedSimulationData from "../simulation/PreComputedSimulationData";
import fetch3DTrajectory from "../utils/fetch3DTrajectory";

const usePageNumber = () => {
    const { page, setPage } = useContext(AppContext);
    const {
        isPlaying,
        setIsPlaying,
        simulariumController,
        inputEquilibriumConcentrations,
        currentProductConcentrationArray,
        inputConcentration,
    } = useContext(SimulariumContext);

    const [trajectoryStatus, setTrajectoryStatus] = useState(
        TrajectoryStatus.INITIAL
    );
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
    useEffect(() => {
        switch (page) {
            case 0:
                break;
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
                break;
            default:
                break;
        }
    }, [page]);
};

export default usePageNumber;
