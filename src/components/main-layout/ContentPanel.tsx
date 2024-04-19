import React from "react";
import PointerIcon from "../icons/PointerIcon";
import NextButton from "../shared/NextButton";
import styles from "./layout.module.css"
export interface ContentPanelProps {
    content: string;
    title?: string;
    callToAction?: string;
    nextButton?: boolean;
    backButton?: boolean;
}

const ContentPanel: React.FC<ContentPanelProps> = ({
    content,
    title,
    callToAction,
    nextButton,
}) => {
    return (
        <>
            <div className={styles.contentPanelText}>
                {title && <h3>{title}</h3>}
                <p>{content}</p>
                {callToAction && (
                    <p className={styles.callToActionP}>
                        <PointerIcon /> {callToAction}
                    </p>
                )}
            </div>
            {nextButton && <NextButton />}
        </>
    );
};

export default ContentPanel;
