import React from "react";
import PointerIcon from "../icons/PointerIcon";
import NextButton from "../shared/NextButton";
import styles from "./layout.module.css";

export interface ContentPanelProps {
    content: string | JSX.Element;
    title?: string;
    callToAction?: string | JSX.Element;
    nextButton?: boolean;
    backButton?: boolean;
    finishButton?: boolean;
}

const ContentPanel: React.FC<ContentPanelProps> = ({
    content,
    title,
    callToAction,
    nextButton,
    finishButton,
}) => {
    const showButton = nextButton || finishButton;
    return (
        <>
            <div className={styles.contentPanelText}>
                {title && <h3>{title}</h3>}
                <p>{content}</p>
                {callToAction && (
                    <p className={styles.callToActionP}>
                        <PointerIcon /> <span>{callToAction}</span>
                    </p>
                )}
            </div>
            {showButton && <NextButton isFinish={finishButton} />}
        </>
    );
};

export default ContentPanel;
