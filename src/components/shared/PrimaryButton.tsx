import React from 'react';
import { Button as AntdButton } from 'antd';

interface ButtonProps extends React.ComponentProps<typeof AntdButton>{
    // Add any additional props you need for your Button component
}

const PrimaryButton: React.FC<ButtonProps> = (props) => {
    return <AntdButton type="primary" {...props} />;
};

export default PrimaryButton;