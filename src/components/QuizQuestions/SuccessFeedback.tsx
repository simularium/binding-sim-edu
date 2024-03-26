import React, { useEffect } from "react";
import { FeedbackProps } from "./types";

const SuccessFeedback: React.FC<FeedbackProps> = ({
    title = "That's correct!",
    message,
}) => {
    const [isVisible, setIsVisible] = React.useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(false);
        }, 3000);
        return () => {
            clearTimeout(timeout);
        };
    }, [])

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
