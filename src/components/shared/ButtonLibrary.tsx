import React from "react";
import { Button as AntdButton } from "antd";
import classNames from "classnames";

import styles from "./button.module.css";

interface ButtonProps extends React.ComponentProps<typeof AntdButton> {
    rounded?: boolean;
}

export const PrimaryButton: React.FC<ButtonProps> = (props) => {
    return (
        <AntdButton
            type="primary"
            className={classNames(styles.primary, {
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
            className={classNames(styles.secondary, {
                [styles.rounded]: props.rounded,
            })}
            {...props}
        />
    );
};

export const TertiaryButton: React.FC<ButtonProps> = (props) => {
    return <AntdButton className={styles.tertiary} {...props} />;
};


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
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

export const OverlayButton: React.FC<OverlayButtonProps> = (props) => {
    const { style } = props;
    let buttonStyle: React.CSSProperties = {
        position: "absolute",
        zIndex: 3001,
        display: "flex",
    };
    if (style) {
        buttonStyle = { ...buttonStyle, ...style };
    }
    return <TertiaryButton {...props} style={buttonStyle} />;
};
