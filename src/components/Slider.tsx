import React, { useState } from 'react';

interface SliderProps {
    min: number;
    max: number;
    initialValue: number;
    onChange: (name: string, value: number) => void;
    name: string;
    disabled: boolean;
}

const Slider: React.FC<SliderProps> = ({
    min,
    max,
    initialValue,
    onChange,
    name,
    disabled
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
                disabled={disabled}
            />
            <span>
                {name}: {value}
            </span>
        </div>
    );
};

export default Slider;
