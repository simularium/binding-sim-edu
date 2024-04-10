import React from "react";
import { Button as AntdButton } from "antd";

interface OverlayButtonProps extends React.ComponentProps<typeof AntdButton> {
    children: React.ReactNode;
    style?: React.CSSProperties;
}

const OverlayButton: React.FC<OverlayButtonProps> = (props) => {
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

export default OverlayButton;
