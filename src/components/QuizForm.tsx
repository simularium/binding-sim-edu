import React, { useState } from 'react';

interface QuizFormProps {
    title: string;
    formContent: JSX.Element | JSX.Element[];
    onSubmit: () => void;
    submitButtonLabel?: string;
}

const QuizForm: React.FC<QuizFormProps> = ({
    title,
    formContent,
    onSubmit,
    submitButtonLabel = "Submit",
}) => {
    const [isFormVisible, setIsFormVisible] = useState(true);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    const handleSubmit = () => {
        onSubmit();
    };

    return (
        <div>
            <h2>{title}</h2>
            {isFormVisible && formContent}
            <button onClick={toggleFormVisibility}>
                {isFormVisible ? "Hide Form" : "Show Form"}
            </button>
            <button onClick={() => handleSubmit()}>{submitButtonLabel}</button>
        </div>
    );
};

export default QuizForm;