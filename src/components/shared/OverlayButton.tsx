import React from 'react';
import { Button as AntdButton } from 'antd';

interface OverlayButtonProps extends React.ComponentProps<typeof AntdButton> {
    children: React.ReactNode;
}

const OverlayButton: React.FC<OverlayButtonProps> = (props) => {
    return (
        <AntdButton
            type="primary"
            ghost
            style={{ position: "absolute", zIndex: 3001 }}
            {...props}
        />
    );
};

export default OverlayButton;