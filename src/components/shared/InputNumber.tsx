import React from "react";
import type { InputNumberProps } from "antd";
import { InputNumber as InputNumberAntd } from "antd";

const InputNumber: React.FC<InputNumberProps> = ({
    value,
    onChange,
    placeholder,
}) => (
    <InputNumberAntd
        value={value}
        onChange={onChange}
        controls={false}
        step={0.1}
        placeholder={placeholder || "Type your answer here..."}
    />
);

export default InputNumber;
