import React, { useEffect } from "react";
import { CheckCircleOutlined, CloseOutlined } from "@ant-design/icons";

import { FeedbackProps } from "./types";
import styles from "./popup.module.css";
import { IconButton } from "../shared/ButtonLibrary";
import classNames from "classnames";
import { BG_DARK } from "../../constants/colors";

const SuccessFeedback: React.FC<FeedbackProps> = ({
    title = "That's correct!",
    message,
}) => {
    const [isVisible, setIsVisible] = React.useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(false);
        }, 6000);
        return () => {
            clearTimeout(timeout);
        };
    }, []);
    return (
        <div className={styles.container}>
            <div
                className={classNames([
                    styles.question,
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
                        style={{ color: BG_DARK }}
                    />
                </div>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default SuccessFeedback;
