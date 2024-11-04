import React, { useEffect } from "react";
import { CheckCircleOutlined, CloseOutlined } from "@ant-design/icons";

import { FeedbackProps } from "./types";
import styles from "./popup.module.css";
import { IconButton } from "../shared/ButtonLibrary";

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
        }, 3000);
        return () => {
            clearTimeout(timeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        isVisible && (
            <div className={styles.container}>
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
        )
    );
};

export default SuccessFeedback;
