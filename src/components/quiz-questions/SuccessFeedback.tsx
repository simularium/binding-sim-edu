import React, { useEffect } from "react";
import { CheckCircleOutlined, CloseOutlined } from "@ant-design/icons";

import { FeedbackProps } from "./types";
import styles from "./popup.module.css";
import { IconButton } from "../shared/ButtonLibrary";
import classNames from "classnames";

const SuccessFeedback: React.FC<FeedbackProps> = ({
    title = "That's correct!",
    message,
    resetForm,
}) => {
    const [isVisible, setIsVisible] = React.useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(false);
            if (resetForm) {
                resetForm();
            }
        }, 6000);
        return () => {
            clearTimeout(timeout);
        };
    }, [resetForm]);
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.inView]: isVisible,
                    [styles.belowView]: !isVisible,
                },
            ])}
        >
            <div className={styles.header}>
                <h2 className={styles.title}>
                    {title} <CheckCircleOutlined />
                </h2>
                <IconButton
                    onClick={() => setIsVisible(false)}
                    icon={<CloseOutlined />}
                />
            </div>
            <p>{message}</p>
        </div>
    );
};

export default SuccessFeedback;
