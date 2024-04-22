import React, { useContext, useState } from "react";
import { Slider as SliderAntd, SliderSingleProps } from "antd";
import { SimulariumContext } from "../../simulation/context";

interface SliderProps {
    min: number;
    max: number;
    initialValue: number;
    onChange: (name: string, value: number) => void;
    name: string;
    disabled?: boolean;
}

const Slider: React.FC<SliderProps> = ({
    min,
    max,
    initialValue,
    onChange,
    name,
    disabled,
}) => {
    const [value, setValue] = useState(initialValue);
    const { recordedConcentrations } = useContext(SimulariumContext);
    const handleSliderChange = (value: number) => {
        setValue(value);
        onChange(name, value);
    };
    const marks: SliderSingleProps["marks"] = {};
    for (let index = min; index <= max; index = index + 2) {
        if (recordedConcentrations.includes(index)) {
            marks[index] = <span>{index}</span>;
        }
        marks[index] = <span>{index}</span>;
    }

    return (
        <SliderAntd
            min={min}
            max={max}
            style={{ width: "100%" }}
            step={2}
            value={value}
            onChange={handleSliderChange}
            disabled={disabled}
            marks={marks}
        />
    );
};

export default Slider;
