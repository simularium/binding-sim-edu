import React from "react";
import { Button as AntdButton } from "antd";
import classNames from "classnames";

import styles from "./button-library.module.css";
import { zStacking } from "../../constants/z-stacking";

interface ButtonProps extends React.ComponentProps<typeof AntdButton> {
    rounded?: boolean;
}

export const PrimaryButton: React.FC<ButtonProps> = (props) => {
    return (
        <AntdButton
            type="primary"
            className={classNames(styles.primary, props.className, {
                [styles.rounded]: props.rounded,
            })}
            {...props}
        />
    );
};

export const SecondaryButton: React.FC<ButtonProps> = (props) => {
    return (
        <AntdButton
            type="default"
            ghost
            className={classNames(styles.secondary, props.className, {
                [styles.rounded]: props.rounded,
            })}
            {...props}
        />
    );
};

export const TertiaryButton: React.FC<ButtonProps> = (props) => {
    return (
        <AntdButton
            {...props}
            className={classNames(props.className, styles.tertiary)}
        />
    );
};

interface IconButtonProps extends React.ComponentProps<typeof AntdButton> {
    icon: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = (props) => {
    return (
        <AntdButton
            shape="circle"
            size="small"
            ghost
            {...props}
            className={classNames(styles.icon, props.className)}
            icon={props.icon}
        />
    );
};

interface OverlayButtonProps extends React.ComponentProps<typeof AntdButton> {
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

export const OverlayButton: React.FC<OverlayButtonProps> = (props) => {
    const { style } = props;
    let buttonStyle: React.CSSProperties = {
        position: "absolute",
        zIndex: zStacking.viewerOverlay,
        display: "flex",
    };
    if (style) {
        buttonStyle = { ...buttonStyle, ...style };
    }
    return <TertiaryButton {...props} style={buttonStyle} />;
};
