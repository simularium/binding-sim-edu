import React, { useContext } from "react";
import { Flex } from "antd";
import PointerIcon from "../icons/PointerIcon";
import NextButton from "../shared/NextButton";
import BackButton from "../shared/BackButton";

import styles from "./layout.module.css";
import { SimulariumContext } from "../../simulation/context";
import { Section } from "../../types";

export interface ContentPanelProps {
    content: string | JSX.Element;
    section: Section;
    title?: string;
    callToAction?: string | JSX.Element;
    moreInfo?: string | JSX.Element;
    nextButton?: boolean;
    backButton?: boolean;
    finishButton?: boolean;
}

const ContentPanel: React.FC<ContentPanelProps> = ({
    content,
    title,
    callToAction,
    backButton,
    nextButton,
    finishButton,
    moreInfo,
}) => {
    const showButton = nextButton || finishButton;
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
            </div>
            <Flex gap={10}>
                {backButton && <BackButton />}
                {showButton && <NextButton isFinish={finishButton} />}
            </Flex>
        </>
    );
};

export default ContentPanel;
