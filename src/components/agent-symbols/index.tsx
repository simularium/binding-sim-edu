import React from "react";
import {
    AGENT_AB_COLOR,
    AGENT_A_COLOR,
    AGENT_B_COLOR,
    AGENT_C_COLOR,
} from "../../constants/colors";

export const A: React.FC = () => {
    return <span style={{ color: AGENT_A_COLOR }}>A</span>;
};

export const B: React.FC = () => {
    return <span style={{ color: AGENT_B_COLOR }}>B</span>;
};

export const C: React.FC = () => {
    return <span style={{ color: AGENT_C_COLOR }}>C</span>;
};

export const AB: React.FC<{ name?: string }> = (props) => {
    return <span style={{ color: AGENT_AB_COLOR }}>{props.name || "AB"}</span>;
};

export const AC: React.FC = () => {
    return <span style={{ color: AGENT_A_COLOR }}>AB</span>;
};
