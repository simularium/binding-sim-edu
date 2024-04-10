import React from "react";
import { Button as AntdButton } from "antd";
import styles from "./button.module.css";

interface ButtonProps extends React.ComponentProps<typeof AntdButton> {
   icon: React.ReactNode;
}

const IconButton: React.FC<ButtonProps> = (props) => {
    return <AntdButton className={styles.icon} shape="circle" size="small" ghost {...props} icon={props.icon} />;
};

export default IconButton;
