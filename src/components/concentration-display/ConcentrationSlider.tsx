import React, { useContext, useMemo } from "react";
import { SliderSingleProps } from "antd";

import Slider from "../shared/Slider";
import { SimulariumContext } from "../../simulation/context";
import styles from "./concentration-slider.module.css";

interface SliderProps {
    min: number;
    max: number;
    initialValue: number;
    onChange: (name: string, value: number) => void;
    name: string;
}

const ConcentrationSlider: React.FC<SliderProps> = ({
    min,
    max,
    initialValue,
    onChange,
    name,
}) => {
    const { recordedConcentrations } = useContext(SimulariumContext);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const disabledNumbers = [0];
    const marks = useMemo(() => {
        const marks: SliderSingleProps["marks"] = {};
        for (let index = min; index <= max; index = index + 2) {
            if (disabledNumbers.includes(index)) {
                marks[index] = <span className={styles.disabled}>{index}</span>;
            } else if (recordedConcentrations.includes(index)) {
                marks[index] = <span className={styles.recorded}>{index}</span>;
            } else {
                marks[index] = (
                    <span className={styles.numberLabel}>{index}</span>
                );
            }
        }
        return marks;
    }, [recordedConcentrations, min, max, disabledNumbers]);
    return (
        <Slider
            initialValue={initialValue}
            className={styles.container}
            name={name}
            min={min}
            max={max}
            step={2}
            onChange={onChange}
            marks={marks}
            disabledNumbers={disabledNumbers}
        />
    );
};

export default ConcentrationSlider;
