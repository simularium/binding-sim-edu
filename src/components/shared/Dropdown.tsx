import React from "react";
import { Dropdown as AntDropdown, Space } from "antd";
import type { MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";

import style from "./dropdown.module.css";
import { BRIGHT_PURPLE_DARKER } from "../../constants/colors";

interface DropdownProps {
    items: MenuProps["items"];
    label: string | JSX.Element;
}

const Dropdown: React.FC<DropdownProps> = ({ items, label, ...rest }) => {
    return (
        <AntDropdown menu={{ items }} className={style.container} {...rest}>
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    {label}
                    <DownOutlined style={{ color: BRIGHT_PURPLE_DARKER }} />
                </Space>
            </a>
        </AntDropdown>
    );
};

export default Dropdown;
