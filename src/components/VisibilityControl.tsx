import React from 'react';

interface VisibilityControlProps {
    excludedPages: number[];
    currentPage: number;
    children: React.ReactNode;
}

const VisibilityControl: React.FC<VisibilityControlProps> = ({
    excludedPages,
    currentPage,
    children,
}) => {
    const shouldRender = !excludedPages.includes(currentPage);
    return shouldRender ? <>{children}</> : null;
};

export default VisibilityControl;