import React, { useState } from 'react';
import { AvailableAgentNames } from '../types';

interface SliderProps {
    min: number;
    max: number;
    initialValue: number;
    onChange: (name: AvailableAgentNames, value: number) => void;
    name: AvailableAgentNames;
}

const Slider: React.FC<SliderProps> = ({
    min,
    max,
    initialValue,
    onChange,
    name
}) => {
    const [value, setValue] = useState(initialValue);

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value);
        setValue(newValue);
        onChange(name, newValue);
    };

    return (
        <div>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={handleSliderChange}
            />
            <span>{name}: {value}</span>
        </div>
    );
};

export default Slider;
