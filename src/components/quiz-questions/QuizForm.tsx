import React, { useState } from "react";
import classNames from "classnames";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

import { FormState } from "./types";
import SuccessFeedback from "./SuccessFeedback";
import FailureFeedback from "./FailureFeedback";
import styles from "./popup.module.css";
import { TertiaryButton, IconButton } from "../shared/Buttons";

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
}) => {
    const [isFormVisible, setIsFormVisible] = useState(true);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    return formState === FormState.Correct ? (
        <SuccessFeedback message={successMessage} />
    ) : (
        <div
            className={classNames(styles.container, {
                [styles.collapsed]: !isFormVisible,
            })}
        >
            <div className={styles.header}>
                <h4 className={styles.title}>
                    {isFormVisible ? title : minimizedTitle}
                </h4>
                <IconButton
                    onClick={toggleFormVisibility}
                    icon={isFormVisible ? <DownOutlined /> : <UpOutlined />}
                />
            </div>
            {isFormVisible && (
                <>
                    {formContent}
                    {formState === FormState.Incorrect && (
                        <FailureFeedback message={failureMessage} />
                    )}
                    <TertiaryButton onClick={onSubmit} className={styles.submit}>
                        {formState === FormState.Incorrect
                            ? "Try Again"
                            : "Submit"}
                    </TertiaryButton>
                </>
            )}
        </div>
    );
};

export default QuizForm;
