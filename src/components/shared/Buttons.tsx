import React from "react";
import { Button as AntdButton, ButtonProps } from "antd";
import styles from "./button.module.css";

interface IconButtonProps extends React.ComponentProps<typeof AntdButton> {
    icon: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = (props) => {
    return (
        <AntdButton
            className={styles.icon}
            shape="circle"
            size="small"
            ghost
            {...props}
            icon={props.icon}
        />
    );
};

interface OverlayButtonProps extends React.ComponentProps<typeof AntdButton> {
    children: React.ReactNode;
    style?: React.CSSProperties;
}

export const OverlayButton: React.FC<OverlayButtonProps> = (props) => {
    const { style } = props;
    let buttonStyle: React.CSSProperties = {
        position: "absolute",
        zIndex: 3001,
    };
    if (style) {
        buttonStyle = { ...buttonStyle, ...style };
    }
    return <AntdButton type="default" {...props} style={buttonStyle} />;
};

export const PrimaryButton: React.FC<ButtonProps> = (props) => {
    return <AntdButton type="primary" {...props} />;
};

export const TertiaryButton: React.FC<ButtonProps> = (props) => {
    return <AntdButton className={styles.tertiary} {...props} />;
};
