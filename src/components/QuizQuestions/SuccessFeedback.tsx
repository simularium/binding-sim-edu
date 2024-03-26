import React from "react";
import { FeedbackProps } from "./types";

const SuccessFeedback: React.FC<FeedbackProps> = ({
    title = "That's correct!",
    message,
}) => {
    const [isVisible, setIsVisible] = React.useState(true);

    return (
        isVisible && (
            <div>
                <h2>{title}</h2>
                <p>{message}</p>
                <button onClick={() => setIsVisible(false)}>Close</button>
            </div>
        )
    );
};

export default SuccessFeedback;
