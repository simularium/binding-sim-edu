import React, { useContext } from "react";
import { SimulariumContext } from "../../simulation/context";
import { Module, Section } from "../../types";

interface VisibilityControlProps {
    children: React.ReactNode;
    startPage?: number;
    excludedPages?: { [key in Module]?: number[] };
    includedPages?: { [key in Module]?: number[] };
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
    const { page, section, module } = useContext(SimulariumContext);
    if (conditionalRender === false) {
        return null;
    }

    let shouldRender = true;

    if (includedPages) {
        shouldRender = includedPages[module]?.includes(page) ?? false;
    } else if (excludedPages) {
        shouldRender = !excludedPages[module]?.includes(page);
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
