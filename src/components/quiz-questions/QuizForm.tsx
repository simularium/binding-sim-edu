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
    successMessage: string | JSX.Element;
    failureMessage: string;
    formID: string;
}

const QuizForm: React.FC<QuizFormProps> = ({
    title,
    formID,
    formContent,
    onSubmit,
    formState,
    successMessage,
    failureMessage,
}) => {
    const { lastOpened, setLastOpened } = React.useContext(CenterPanelContext);
    const [show, setShow] = React.useState(false);

    const isFormMaximized = lastOpened === formID;
    const minimizedTitle = `Q:${formID}`;

    // open form on mount
    useEffect(() => {
        setLastOpened(formID);
        setTimeout(() => {
            setShow(true);
        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleFormVisibility = () => {
        if (!isFormMaximized) {
            setLastOpened(formID);
        } else {
            setLastOpened(null);
        }
    };
    return formState === FormState.Correct ? (
        <SuccessFeedback message={successMessage} />
    ) : (
        <div
            className={classNames(styles.container, {
                [styles.collapsed]: !isFormMaximized,
            })}
        >
            <div
                className={classNames(styles.question, {
                    [styles.inView]: show,
                    [styles.belowView]: !show,
                })}
            >
                <div className={styles.header}>
                    <h3 className={styles.title}>
                        {isFormMaximized ? title : minimizedTitle}
                    </h3>
                    <IconButton
                        onClick={toggleFormVisibility}
                        icon={
                            isFormMaximized ? (
                                <DownOutlined style={{ color: BG_DARK }} />
                            ) : (
                                <UpOutlined style={{ color: BG_DARK }} />
                            )
                        }
                    />
                </div>
                {isFormMaximized && (
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
        </div>
    );
};

export default QuizForm;
