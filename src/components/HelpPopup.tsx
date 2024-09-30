import React from "react";
import { Popover } from "antd";

interface HelpPopupProps {
    children: React.ReactNode;
    content: React.ReactNode;
    initialOpen: boolean;
}

const HelpPopup: React.FC<HelpPopupProps> = ({
    children,
    content,
    initialOpen,
}) => {
    return (
        <Popover
            open={initialOpen}
            content={content}
            placement="left"
            arrow={true}
        >
            {children}
        </Popover>
    );
};

export default HelpPopup;
