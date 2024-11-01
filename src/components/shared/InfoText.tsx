import React from "react";
import { Popover } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { TooltipPlacement } from "antd/es/tooltip";

import styles from "./info-text.module.css";
import { IconButton } from "./ButtonLibrary";
import { UiElement } from "../../types";
import infoText from "../../content/info-text";

interface GlossaryTermProps {
    uiElement: UiElement;
    placement?: TooltipPlacement;
}

const InfoText: React.FC<GlossaryTermProps> = ({ placement, uiElement }) => {
    const text = infoText[uiElement];
    return (
        <Popover
            content={text}
            trigger={["click", "hover"]}
            mouseEnterDelay={0.1}
            placement={placement || "top"}
        >
            <IconButton
                className={styles.icon}
                icon={<QuestionCircleOutlined />}
            />
        </Popover>
    );
};

export default InfoText;
