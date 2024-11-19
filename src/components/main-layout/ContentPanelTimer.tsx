import React, { useContext, useEffect, useRef, useState } from "react";

import styles from "./layout.module.css";
import { SimulariumContext } from "../../simulation/context";
import { PageContent, Module } from "../../types";

import classNames from "classnames";
import { isEqual } from "lodash";
import ContentPanel from "./ContentPanel";

export interface ContentPanelProps {
    pageContent: PageContent;
    currentModule: Module;
}

enum RenderState {
    NewContent = 1,
    StartFade = 2,
    FullyVisible = 3,
}

const ContentPanelTimer: React.FC<ContentPanelProps> = ({
    pageContent,
    currentModule,
}) => {
    const [renderState, setRenderState] = useState(RenderState.NewContent);
    const contentVisibleRef = useRef(false);
    const previousContentRef = useRef(pageContent);

    const setVisible = (type: RenderState) => {
        if (type >= RenderState.StartFade) {
            if (contentVisibleRef.current === false) {
                contentVisibleRef.current = true;
            }
        } else {
            contentVisibleRef.current = false;
        }
        setRenderState(type);
    };

    useEffect(() => {
        contentVisibleRef.current = false;
        const count: number = 1;
        let timer: NodeJS.Timeout;
        console.log("visible", contentVisibleRef.current);
        const updateRenderState = (count: number) => {
            previousContentRef.current = { ...pageContent };
            console.log("count", count);
            setVisible(count);
            count = count + 1;
            if (count <= RenderState.FullyVisible) {
                timer = setTimeout(() => updateRenderState(count), 100);
            } else {
                return () => clearTimeout(timer);
            }
        };
        timer = setTimeout(() => updateRenderState(count), 100);
        return () => clearTimeout(timer);
    }, [pageContent.content]);

    const contentJustChanged = !isEqual(
        previousContentRef.current.content,
        pageContent.content
    );
    const contentToUse = contentJustChanged
        ? previousContentRef.current
        : pageContent;
    const {
        content,
        title,
        callToAction,
        backButton,
        nextButton,
        nextButtonText,
        moreInfo,
        actionButton,
        section,
    } = contentToUse;

    const showButton = nextButton;
    const { page } = useContext(SimulariumContext);

    const pageNumber = contentJustChanged ? page - 1 : page;

    const containerClassNames = classNames([
        styles.contentPanelWrapper,
        {
            [styles.fadeOut]: contentJustChanged,
        },
        { [styles.loaded]: renderState >= RenderState.StartFade },
    ]);

    return (
        <ContentPanel
            pageNumber={pageNumber}
            title={title}
            layout={pageContent.layout}
            content={content}
            callToAction={callToAction}
            backButton={backButton}
            nextButton={showButton}
            nextButtonText={nextButtonText}
            moreInfo={moreInfo}
            actionButton={actionButton}
            section={section}
            currentModule={currentModule}
            containerClass={containerClassNames}
        />
    );
};

export default ContentPanelTimer;
