import React from "react";
import { Radio, RadioChangeEvent } from "antd";

interface RadioProps {
    options: { value: string; label: string }[];
    onChange: (value: RadioChangeEvent) => void;
    selectedAnswer: string;
}

const RadioComponent: React.FC<RadioProps> = ({
    options,
    onChange,
    selectedAnswer,
}) => {
    return (
        <Radio.Group
            value={selectedAnswer}
            onChange={onChange}
            options={options}
            buttonStyle="solid"
        />
    );
};

export default RadioComponent;
