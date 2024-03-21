import React, { useState } from 'react';

interface QuizFormProps {
    title: string;
    formContent: JSX.Element | JSX.Element[];
    onSubmit: () => void;
}

const QuizForm: React.FC<QuizFormProps> = ({
    title,
    formContent,
    onSubmit,
}) => {
    const [isFormVisible, setIsFormVisible] = useState(true);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    return (
        <div>
            <h2>{title}</h2>
            {isFormVisible && formContent}
            <button onClick={toggleFormVisibility}>
                {isFormVisible ? "Hide Form" : "Show Form"}
            </button>
            <button onClick={onSubmit}>Submit</button>
        </div>
    );
};

export default QuizForm;