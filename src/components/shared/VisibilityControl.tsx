import React, { useContext } from "react";
import { SimulariumContext } from "../../simulation/context";
import { Section } from "../../types";

interface VisibilityControlProps {
    children: React.ReactNode;
    startPage?: number;
    excludedPages?: number[];
    includedPages?: number[];
    conditionalRender?: boolean;
    notInBonusMaterial?: boolean;
    notInIntroduction?: boolean;
}

const VisibilityControl: React.FC<VisibilityControlProps> = ({
    excludedPages,
    children,
    includedPages,
    conditionalRender,
    notInBonusMaterial,
    notInIntroduction,
    startPage,
}) => {
    const { page, section } = useContext(SimulariumContext);
    if (conditionalRender === false) {
        return null;
    }

    let shouldRender = true;

    if (includedPages) {
        shouldRender = includedPages.includes(page);
    } else if (excludedPages) {
        shouldRender = !excludedPages.includes(page);
    }
    if (startPage && page < startPage) {
        shouldRender = false;
    }
    if (notInBonusMaterial && section === Section.BonusContent) {
        shouldRender = false;
    }
    if (notInIntroduction && section === Section.Introduction) {
        shouldRender = false;
    }

    return shouldRender ? <>{children}</> : null;
};

export default VisibilityControl;
