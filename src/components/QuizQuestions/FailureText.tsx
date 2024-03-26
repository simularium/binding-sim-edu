import React from "react";
import { FeedbackProps } from "./types";

const FailureFeedback: React.FC<FeedbackProps> = ({
    title = "Sorry, that's incorrect.",
    message,
}) => {
    return (
        <div>
            <h2>{title}</h2>
            <p>{message}</p>
        </div>
    );
};

export default FailureFeedback;
