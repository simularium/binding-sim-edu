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

    const marks = useMemo(() => {
        const marks: SliderSingleProps["marks"] = {};
        for (let index = min; index <= max; index = index + 2) {
            if (recordedConcentrations.includes(index)) {
                marks[index] = <span className={styles.recorded}>{index}</span>;
            } else {
                marks[index] = <span className={styles.numberLabel}>{index}</span>;
            }
        }
        return marks;
    }, [recordedConcentrations, min, max]);
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
        />
    );
};

export default ConcentrationSlider;
