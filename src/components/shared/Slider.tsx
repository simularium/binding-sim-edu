import React, { useState } from "react";
import { Slider as SliderAntd, SliderSingleProps } from "antd";

interface SliderProps {
    min: number;
    max: number;
    step: number;
    initialValue: number;
    onChange: (name: string, value: number) => void;
    onChangeComplete?: (name: string, value: number) => void;
    name: string;
    disabled?: boolean;
    marks?: SliderSingleProps["marks"];
    className?: string;
    disabledNumbers?: number[];
    overrideValue?: number;
}

const Slider: React.FC<SliderProps> = ({
    min,
    max,
    step,
    initialValue,
    onChange,
    name,
    disabled,
    marks,
    className,
    disabledNumbers,
    onChangeComplete,
    overRideValue,
}) => {
    const [value, setValue] = useState(initialValue);
    const handleSliderChange = (newValue: number) => {
        if (disabledNumbers && disabledNumbers.includes(newValue)) {
            setValue(value);

            return;
        }
        setValue(newValue);
        onChange(name, newValue);
    };

    const handleSliderChangeComplete = (newValue: number) => {
        if (disabledNumbers && disabledNumbers.includes(newValue)) {
            return;
        }
        if (onChangeComplete) {
            onChangeComplete(name, newValue);
        }
    };

    return (
        <SliderAntd
            className={className}
            min={min}
            max={max}
            style={{ width: "100%" }}
            step={step}
            value={overRideValue ?? value}
            onChange={handleSliderChange}
            onChangeComplete={handleSliderChangeComplete}
            disabled={disabled}
            marks={marks}
        />
    );
};

export default Slider;
