import React, { useState } from "react";
import { Slider as SliderAntd } from "antd";

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

    const handleSliderChange = (value: number) => {
        setValue(value);
        onChange(name, value);
    };

    return (
        <SliderAntd
            min={min}
            max={max}
            style={{ width: "100%" }}
            step={2}
            value={value}
            onChange={handleSliderChange}
            disabled={disabled}
        />
    );
};

export default Slider;
