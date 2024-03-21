import React, { useContext } from 'react';
import { SimulariumContext } from '../simulation/context';

interface VisibilityControlProps {
    excludedPages?: number[];
    children: React.ReactNode;
    includedPages?: number[];
}

const VisibilityControl: React.FC<VisibilityControlProps> = ({
    excludedPages,
    children,
    includedPages,
}) => {
    const { page } = useContext(SimulariumContext);

    let shouldRender = true;
    if (includedPages) {
        shouldRender = includedPages.includes(page);
    } else if (excludedPages) {
        shouldRender = !excludedPages.includes(page);
    }
    return shouldRender ? <>{children}</> : null;
};

export default VisibilityControl;