import React, { useEffect, useMemo, useRef } from "react";
import { SliderSingleProps } from "antd";

import Slider from "../shared/Slider";
import { useSimulariumAnalysis } from "../../hooks/useSimulationContext";
import styles from "./concentration-slider.module.css";
import classNames from "classnames";

interface SliderProps {
    disabled?: boolean;
    initialValue: number;
    max: number;
    min: number;
    name: string;
    onChange: (name: string, value: number) => void;
    onChangeComplete?: (name: string, value: number) => void;
}

const Mark: React.FC<{
    index: number;
    disabledNumbers: number[];
    onMouseUp: () => void;
}> = ({ index, disabledNumbers, onMouseUp }) => {
    const { recordedConcentrations } = useSimulariumAnalysis();

    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // clicking on the antd slider marks initiates the onChange event,
        // but not the onChangeComplete event. This add a mouseup listener
        // to the mark to trigger the onChangeComplete event the same way
        // as if the user had clicked on the slider handle.
        const mark = ref.current;
        if (!mark) {
            return;
        }
        mark.addEventListener("mouseup", onMouseUp);
        return () => {
            mark.removeEventListener("mouseup", onMouseUp);
        };
    }, [onMouseUp]);

    return (
        <div
            ref={ref}
            key={index}
            className={classNames(styles.numberLabel, {
                [styles.recorded]: recordedConcentrations.includes(index),
                [styles.disabled]: disabledNumbers.includes(index),
            })}
        >
            <span>{index}</span>
        </div>
    );
};

const ConcentrationSlider: React.FC<SliderProps> = ({
    disabled,
    initialValue,
    max,
    min,
    name,
    onChange,
    onChangeComplete,
}) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const disabledNumbers = [0];
    const stepSize = useMemo(() => (max - min) / 5, [min, max]);
    const marks = useMemo(() => {
        const marks: SliderSingleProps["marks"] = {};
        for (let index = min; index <= max; index = index + stepSize) {
            marks[index] = {
                label: (
                    <Mark
                        index={
                            index < 1 && index > 0
                                ? Number(index.toFixed(1))
                                : index
                        }
                        disabledNumbers={disabledNumbers}
                        onMouseUp={
                            disabled
                                ? () => {}
                                : () => onChangeComplete?.(name, index)
                        }
                    />
                ),
            };
        }
        return marks;
    }, [min, max, disabledNumbers, disabled, onChangeComplete, name, stepSize]);
    return (
        <Slider
            disabled={disabled}
            initialValue={initialValue}
            className={styles.container}
            name={name}
            min={min}
            max={max}
            step={stepSize}
            onChange={onChange}
            onChangeComplete={onChangeComplete}
            marks={marks}
            disabledNumbers={disabledNumbers}
        />
    );
};

export default ConcentrationSlider;
