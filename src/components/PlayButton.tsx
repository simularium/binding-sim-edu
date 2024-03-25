import React, { useContext } from 'react';
import { SimulariumContext } from '../simulation/context';
import ProgressionControl from './ProgressionControl';

const PlayButton: React.FC = () => {
    const { isPlaying, setIsPlaying } = useContext(SimulariumContext);

    const handleClick = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <ProgressionControl onPage={[2, 5]}>
            <button onClick={handleClick}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
        </ProgressionControl>)
};

export default PlayButton;