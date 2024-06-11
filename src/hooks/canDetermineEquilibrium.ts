import { useMemo } from "react";
import { InputConcentration } from "../types";

const useCanDetermineEquilibrium = (
    inputConcentration: InputConcentration,
    uniqMeasuredConcentrations: number[]
) => {
    // Ongoing check to see if they've measured enough values to determine Kd
    const halfFilled = inputConcentration.A ? inputConcentration.A / 2 : 5;

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

    return canDetermineEquilibrium;
};

export default useCanDetermineEquilibrium;
