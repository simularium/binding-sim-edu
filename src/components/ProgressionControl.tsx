import React, { useContext } from 'react';
import { SimulariumContext } from '../simulation/context';

interface ProgressionControlProps {
    children: React.ReactNode;
    onPage: number;
}

const ProgressionControl: React.FC<ProgressionControlProps> = ({children, onPage}) => {
    const { page, setPage } = useContext(SimulariumContext);
    console.log(page, onPage)
    const handleClick = () => {
        if (page === onPage) {
            setPage(page + 1);
        }
    };

    return (
        <div onClick={handleClick}>
            {children}
        </div>
    );
};

export default ProgressionControl;