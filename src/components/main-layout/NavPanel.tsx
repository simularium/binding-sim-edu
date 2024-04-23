import React from "react";
import PageIndicator from "../PageIndicator";

interface NavPanelProps {
    title: string;
    page: number;
    total: number;
}



const NavPanel: React.FC<NavPanelProps> = ({ title, page, total }) => {
    return (
        <PageIndicator title={title} page={page} total={total} />
    );
};

export default NavPanel;
