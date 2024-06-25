import React, { useCallback, useEffect, useState } from "react";
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
    const { numberOpen, setNumberOpen, lastOpened, setLastOpened } =
        React.useContext(CenterPanelContext);

    const openForm = useCallback(() => {
        setNumberOpen(numberOpen + 1);
        setLastOpened(minimizedTitle);
        setIsFormVisible(true);
    }, [numberOpen, minimizedTitle, setLastOpened, setNumberOpen]);

    const closeForm = useCallback(() => {
        Math.min((setNumberOpen(numberOpen - 1), 0));
        setIsFormVisible(false);
    }, [setNumberOpen, numberOpen]);

    // open form on mount
    useEffect(() => {
        openForm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (numberOpen > 1 && isFormVisible && lastOpened !== minimizedTitle) {
            // Close the form if another form is opened
            closeForm();
        }
    }, [numberOpen, isFormVisible, lastOpened, minimizedTitle, closeForm]);

    const toggleFormVisibility = () => {
        if (!isFormVisible) {
            openForm();
        } else {
            closeForm();
        }
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
                        <FailureFeedback message={failureMessage} />
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
