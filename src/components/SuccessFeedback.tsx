import React from 'react';

interface SuccessFeedbackProps {
    title?: string;
    message: string;
}

const SuccessFeedback: React.FC<SuccessFeedbackProps> = ({ title="That's correct!", message }) => {
    const [isVisible, setIsVisible] = React.useState(true);

    return (
        isVisible &&
        <div>
            <h2>{title}</h2>
            <p>{message}</p>
            <button onClick={() => setIsVisible(false)}>Close</button>
        </div>
    );
};

export default SuccessFeedback;