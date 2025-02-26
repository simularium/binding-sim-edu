import React, { useContext, useEffect, useMemo, useRef } from "react";
import { SliderSingleProps } from "antd";

import Slider from "../shared/Slider";
import { SimulariumContext } from "../../simulation/context";
import styles from "./concentration-slider.module.css";
import classNames from "classnames";

interface SliderProps {
    min: number;
    max: number;
    initialValue: number;
    onChange: (name: string, value: number) => void;
    onChangeComplete?: (name: string, value: number) => void;
    name: string;
}

const Mark: React.FC<{
    index: number;
    disabledNumbers: number[];
    onMouseUp: () => void;
}> = ({ index, disabledNumbers, onMouseUp }) => {
    const { recordedConcentrations } = useContext(SimulariumContext);

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
    min,
    max,
    initialValue,
    onChange,
    onChangeComplete,
    name,
}) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const disabledNumbers = [0];
    const stepSize = useRef(0);
    const marks = useMemo(() => {
        stepSize.current = (max - min) / 5;
        const marks: SliderSingleProps["marks"] = {};
        for (let index = min; index <= max; index = index + stepSize.current) {
            marks[index] = {
                label: (
                    <Mark
                        index={index}
                        disabledNumbers={disabledNumbers}
                        onMouseUp={() =>
                            onChangeComplete && onChangeComplete(name, index)
                        }
                    />
                ),
            };
        }
        return marks;
    }, [min, max, disabledNumbers, onChangeComplete, name]);
    return (
        <Slider
            initialValue={initialValue}
            className={styles.container}
            name={name}
            min={min}
            max={max}
            step={stepSize.current}
            onChange={onChange}
            onChangeComplete={onChangeComplete}
            marks={marks}
            disabledNumbers={disabledNumbers}
        />
    );
};

export default ConcentrationSlider;
