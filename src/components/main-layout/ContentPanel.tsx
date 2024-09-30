import React from "react";
import PointerIcon from "../icons/PointerIcon";
import NextButton from "../shared/NextButton";
import styles from "./layout.module.css";
import BackButton from "../shared/BackButton";
export interface ContentPanelProps {
    content: string | JSX.Element;
    title?: string;
    callToAction?: string | JSX.Element;
    nextButton?: boolean;
    backButton?: boolean;
}

const ContentPanel: React.FC<ContentPanelProps> = ({
    content,
    title,
    callToAction,
    backButton,
    nextButton,
}) => {
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
            {backButton && <BackButton />}
            {nextButton && <NextButton />}
        </>
    );
};

export default ContentPanel;
