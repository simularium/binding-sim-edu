import { useContext } from 'react';
import { SimulariumContext } from '../../simulation/context';
import  Button from '../shared/Button';

const NextButton = () => {
    const {
        page,
        setPage
    } = useContext(SimulariumContext);

    return <Button type="primary" onClick={() => setPage(page + 1)}>Next</Button>;
};

export default NextButton;