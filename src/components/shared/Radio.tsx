import React from "react";
import { Radio, RadioChangeEvent } from "antd";
import styles from "./radio.module.css";

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
            className={styles.container}
            value={selectedAnswer}
            onChange={onChange}
            options={options}
        />
    );
};

export default RadioComponent;
