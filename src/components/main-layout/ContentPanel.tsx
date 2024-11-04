import React, { useContext } from "react";
import { Flex } from "antd";
import PointerIcon from "../icons/PointerIcon";
import NextButton from "../shared/NextButton";
import BackButton from "../shared/BackButton";

import styles from "./layout.module.css";
import { SimulariumContext } from "../../simulation/context";
import { PillButton } from "../shared/ButtonLibrary";
import { Section, PageContent, Module } from "../../types";
import useModule from "../../hooks/useModule";
import { moduleNames } from "../../content";

export interface ContentPanelProps extends PageContent {
    currentModule: Module;
}

const ContentPanel: React.FC<ContentPanelProps> = ({
    content,
    title,
    callToAction,
    backButton,
    nextButton,
    moreInfo,
    modal,
    nextButtonText,
    actionButton,
    section,
    currentModule,
}) => {
    const showButton = nextButton;
    const { page } = useContext(SimulariumContext);

    const { totalMainContentPages } = useModule(currentModule);
    const moduleName = moduleNames[currentModule];
    let header;
    const module = <span style={{ fontWeight: 300 }}>{moduleName}</span>;
    if (section !== Section.BonusContent) {
        const pageInfo = `${page} of ${totalMainContentPages}`;
        if (title) {
            header = (
                <>
                    {pageInfo} - {module} - {title}
                </>
            );
        } else {
            header = (
                <>
                    {pageInfo} - {module} - {Section[section]}
                </>
            );
        }
    } else {
        header = title;
    }
    return (
        <>
            <div className={styles.contentPanelText}>
                <h3>{header}</h3>
                <p>{content}</p>
                {modal && (
                    <Flex gap={12} align="center">
                        <PillButton size="small" ghost className="inline-pill">
                            {modal.title}
                        </PillButton>
                        {moreInfo && <span>{moreInfo}</span>}
                    </Flex>
                )}

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
