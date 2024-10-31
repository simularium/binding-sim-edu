import React, { useEffect } from "react";
import classNames from "classnames";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

import { FormState } from "./types";
import SuccessFeedback from "./SuccessFeedback";
import FailureFeedback from "./FailureFeedback";
import styles from "./popup.module.css";
import { TertiaryButton, IconButton } from "../shared/ButtonLibrary";
import { BG_DARK } from "../../constants/colors";
import { CenterPanelContext } from "../main-layout/CenterPanel";

interface QuizFormProps {
    title: string;
    formContent: JSX.Element | JSX.Element[];
    onSubmit: () => void;
    submitButtonLabel?: string;
    formState: FormState;
    successMessage: string;
    failureMessage: string;
    id: string;
    resetForm: () => void;
}

const QuizForm: React.FC<QuizFormProps> = ({
    title,
    id,
    formContent,
    onSubmit,
    formState,
    successMessage,
    failureMessage,
    resetForm,
}) => {
    const { lastOpened, setLastOpened } = React.useContext(CenterPanelContext);
    const isFormVisible = lastOpened === id;
    const minimizedTitle = `Q:${id}`;

    // open form on mount
    useEffect(() => {
        setLastOpened(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleFormVisibility = () => {
        if (!isFormVisible) {
            setLastOpened(id);
        } else {
            setLastOpened(null);
        }
    };
    if (formState === FormState.Finished) {
        return null;
    }

    return formState === FormState.Correct ? (
        <SuccessFeedback message={successMessage} resetForm={resetForm} />
    ) : (
        <div
            className={classNames(styles.container, {
                [styles.collapsed]: !isFormVisible,
            })}
        >
            <div className={styles.header}>
                <h3 className={styles.title}>
                    {isFormVisible ? title : minimizedTitle}
                </h3>
                <IconButton
                    onClick={toggleFormVisibility}
                    icon={
                        isFormVisible ? (
                            <DownOutlined style={{ color: BG_DARK }} />
                        ) : (
                            <UpOutlined style={{ color: BG_DARK }} />
                        )
                    }
                />
            </div>
            {isFormVisible && (
                <>
                    {formContent}
                    {formState === FormState.Incorrect && (
                        <FailureFeedback
                            message={failureMessage}
                            resetForm={resetForm}
                        />
                    )}
                    <TertiaryButton
                        onClick={onSubmit}
                        style={{ marginTop: 10 }}
                    >
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
