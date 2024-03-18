import React from 'react';

interface NavPanelProps {
    title: number;
    page: number;
    total: number;
}

const NavPanel: React.FC<NavPanelProps> = ({ title, page, total }) => {


    return (
        <div>
                {title} {page} / {total}
        </div>
    );
};

export default NavPanel;