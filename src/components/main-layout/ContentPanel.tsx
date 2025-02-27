import React from "react";
import { Flex } from "antd";

import useModule from "../../hooks/useModule";
import { Section, PageContent, Module } from "../../types";
import { moduleNames } from "../../content";
import PointerIcon from "../icons/PointerIcon";
import NextButton from "../shared/NextButton";
import BackButton from "../shared/BackButton";
import CustomModal from "../shared/CustomModal";

import styles from "./layout.module.css";
export interface ContentPanelProps extends PageContent {
    currentModule: Module;
    pageNumber: number;
    containerClass?: string;
}

const ContentPanel: React.FC<ContentPanelProps> = ({
    pageNumber,
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
    containerClass,
}) => {
    const showButton = nextButton;
    const { totalMainContentPages } = useModule(currentModule);
    const moduleName = moduleNames[currentModule];
    let header;
    const module = <span style={{ fontWeight: 300 }}>{moduleName}</span>;
    if (section !== Section.BonusContent) {
        const pageInfo = `${pageNumber} of ${totalMainContentPages}`;
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
        <div className={containerClass}>
            <div className={styles.contentPanelText}>
                <h3>{header}</h3>
                <p>{content}</p>
                {modal && (
                    <Flex gap={12} align="center">
                        <CustomModal
                            title={modal.title}
                            content={modal.content}
                        />
                        {moreInfo && <span>{moreInfo}</span>}
                    </Flex>
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
        </div>
    );
};

export default ContentPanel;
