import React, { useContext } from 'react';
import { SimulariumContext } from '../simulation/context';

const PlayButton: React.FC = () => {
    const { isPlaying, setIsPlaying } = useContext(SimulariumContext);

    const handleClick = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <button onClick={handleClick}>
            {isPlaying ? 'Pause' : 'Play'}
        </button>
    );
};

export default PlayButton;