import React, { useContext } from "react";
import { Flex } from "antd";
import PointerIcon from "../icons/PointerIcon";
import NextButton from "../shared/NextButton";
import BackButton from "../shared/BackButton";

import styles from "./layout.module.css";
import { SimulariumContext } from "../../simulation/context";
import { PillButton } from "../shared/ButtonLibrary";

export interface ContentPanelProps {
    content: string | JSX.Element;
    title?: string;
    callToAction?: string | JSX.Element;
    modal?: {
        buttonText: string;
        content: string | JSX.Element;
    };
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
                {
                    <Flex gap={12} align="center">
                        <PillButton size="small" ghost className="inline-pill">
                            Learn how to derive K<sub>d</sub>
                        </PillButton>
                        {moreInfo && <span>{moreInfo}</span>}
                    </Flex>
                }
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
