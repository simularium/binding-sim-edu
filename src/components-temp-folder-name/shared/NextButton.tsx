import { useContext } from 'react';
import { SimulariumContext } from '../../simulation/context';

const NextButton = () => {
    const {
        page,
        setPage
    } = useContext(SimulariumContext);

    return (
        <button onClick={() => setPage(page + 1)}>
            Next
        </button>
    );
};

export default NextButton;