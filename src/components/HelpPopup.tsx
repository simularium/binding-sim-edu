import React from "react";
import { Popover } from "antd";

interface HelpPopupProps {
    children: React.ReactNode;
    content: React.ReactNode;
    open?: boolean;
    trigger?: "hover" | "click" | "focus";
}

const HelpPopup: React.FC<HelpPopupProps> = ({
    children,
    content,
    open,
    trigger,
}) => {
    return (
        <Popover
            open={open}
            trigger={trigger}
            content={content}
            placement="left"
            arrow={true}
        >
            {children}
        </Popover>
    );
};

export default HelpPopup;
