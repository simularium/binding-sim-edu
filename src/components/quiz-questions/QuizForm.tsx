import React, { useState } from "react";
import { FormState } from "./types";
import SuccessFeedback from "./SuccessFeedback";
import FailureFeedback from "./FailureFeedback";
import styles from "./popup.module.css";
import TertiaryButton from "../shared/TertiaryButton";

interface QuizFormProps {
    title: string;
    formContent: JSX.Element | JSX.Element[];
    onSubmit: () => void;
    submitButtonLabel?: string;
    formState: FormState;
    successMessage: string;
    failureMessage: string;
    minimizedTitle: string;
}

const QuizForm: React.FC<QuizFormProps> = ({
    title,
    minimizedTitle,
    formContent,
    onSubmit,
    formState,
    successMessage,
    failureMessage,
    submitButtonLabel = "Submit",
}) => {
    const [isFormVisible, setIsFormVisible] = useState(true);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    return formState === FormState.Correct ? (
        <SuccessFeedback message={successMessage} />
    ) : (
        <div className={styles.container}>
            <h2>{isFormVisible ? title : minimizedTitle}</h2>
            {isFormVisible && formContent}
            <button onClick={toggleFormVisibility}>
                {isFormVisible ? "Hide Form" : "Show Form"}
            </button>
            {formState === FormState.Incorrect && (
                <FailureFeedback message={failureMessage} />
            )}
            <TertiaryButton onClick={onSubmit}>
                {submitButtonLabel}
            </TertiaryButton>
        </div>
    );
};

export default QuizForm;
