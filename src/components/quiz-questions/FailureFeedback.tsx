import React from "react";
import { FeedbackProps } from "./types";
import styles from "./popup.module.css";

const FailureFeedback: React.FC<FeedbackProps> = ({
    title = "Sorry, that's incorrect.",
    message,
}) => {
    return (
        <div className={styles.failure}>
            <h3>{title}</h3>
            <p>{message}</p>
        </div>
    );
};

export default FailureFeedback;
