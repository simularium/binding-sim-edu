import React from 'react';
import { Button as AntdButton } from 'antd';

interface ButtonProps extends React.ComponentProps<typeof AntdButton>{
    // Add any additional props you need for your Button component
}

const Button: React.FC<ButtonProps> = (props) => {
    return <AntdButton {...props} />;
};

export default Button;