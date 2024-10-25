import React, { useContext } from "react";
import { Flex } from "antd";
import PointerIcon from "../icons/PointerIcon";
import NextButton from "../shared/NextButton";
import BackButton from "../shared/BackButton";

import styles from "./layout.module.css";
import { SimulariumContext } from "../../simulation/context";
import { Section, LayoutType } from "../../types";

export interface ContentPanelProps {
    content: string | JSX.Element;
    section: Section;
    layout: LayoutType;
    visualContent?: JSX.Element;
    title?: string;
    actionButton?: JSX.Element;
    callToAction?: string | JSX.Element;
    moreInfo?: string | JSX.Element;
    nextButton?: boolean;
    backButton?: boolean;
    nextButtonText?: string;
}

const ContentPanel: React.FC<ContentPanelProps> = ({
    content,
    title,
    callToAction,
    backButton,
    nextButton,
    nextButtonText,
    moreInfo,
    actionButton,
}) => {
    const showButton = nextButton;
    const { exampleTrajectoryPageNumber, page } = useContext(SimulariumContext);
    let header;
    if (page < exampleTrajectoryPageNumber) {
        header = `${page} of ${exampleTrajectoryPageNumber - 1} - ${title}`;
    } else {
        header = title;
    }
    return (
        <>
            <div className={styles.contentPanelText}>
                <h3>{header}</h3>
                <p>{content}</p>

                {moreInfo && (
                    <span className={styles.moreInfo}>{moreInfo}</span>
                )}
                {callToAction && (
                    <p className={styles.callToActionP}>
                        <PointerIcon /> <span>{callToAction}</span>
                    </p>
                )}
                {actionButton && actionButton}
            </div>
            <Flex gap={10}>
                {backButton && <BackButton />}
                {showButton && <NextButton text={nextButtonText} />}
            </Flex>
        </>
    );
};

export default ContentPanel;
