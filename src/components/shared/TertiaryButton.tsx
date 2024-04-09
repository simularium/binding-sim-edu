import React from 'react';
import { Button as AntdButton } from 'antd';
import styles from './button.module.css';

interface ButtonProps extends React.ComponentProps<typeof AntdButton>{
    // Add any additional props you need for your Button component
}

const TertiaryButton: React.FC<ButtonProps> = (props) => {
    return <AntdButton className={styles.tertiary} {...props} />;
};

export default TertiaryButton;