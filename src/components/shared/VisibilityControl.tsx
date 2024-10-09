import React, { useContext } from "react";
import { SimulariumContext } from "../../simulation/context";

interface VisibilityControlProps {
    excludedPages?: number[];
    children: React.ReactNode;
    includedPages?: number[];
    conditionalRender?: boolean;
    notInBonusMaterial?: boolean;
}

const VisibilityControl: React.FC<VisibilityControlProps> = ({
    excludedPages,
    children,
    includedPages,
    conditionalRender,
    notInBonusMaterial,
}) => {
    const { page, exampleTrajectoryPageNumber } = useContext(SimulariumContext);
    if (conditionalRender === false) {
        return null;
    }

    let shouldRender = true;

    if (includedPages) {
        shouldRender = includedPages.includes(page);
    } else if (excludedPages) {
        shouldRender = !excludedPages.includes(page);
    }
    if (
        notInBonusMaterial !== undefined &&
        notInBonusMaterial &&
        page >= exampleTrajectoryPageNumber
    ) {
        shouldRender = false;
    }

    return shouldRender ? <>{children}</> : null;
};

export default VisibilityControl;
