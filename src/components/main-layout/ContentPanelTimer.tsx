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

// these three states are used to avoid flashing the content before the
// opacity transition starts
enum RenderState {
    NoRender = 1,
    RenderFadeIn = 2,
    FullyVisible = 3,
}

const ContentPanelTimer: React.FC<ContentPanelProps> = ({
    pageContent,
    currentModule,
}) => {
    const [renderState, setRenderState] = useState(RenderState.NoRender);
    const previousContentRef = useRef(pageContent);
    const contentJustChanged = !isEqual(
        previousContentRef.current.content,
        pageContent.content
    );

    useEffect(() => {
        // There are pages that have the same written content, so flashing the
        // panel is more distracting than helpful. However, since this Ref is defaulted
        // to the first page content, this check will always be true on the first page, and
        // will keep the content from being rendered, so it needs to be excluded
        if (!contentJustChanged && page !== 1) {
            previousContentRef.current = pageContent;
            return;
        }
        const initialState: number = 1;
        const FADE_TIME = 150;
        const updateRenderState = (
            currentRenderState: number
        ): NodeJS.Timeout | null => {
            previousContentRef.current = pageContent;
            setRenderState(currentRenderState);
            currentRenderState += 1;
            if (currentRenderState <= RenderState.FullyVisible) {
                return setTimeout(
                    () => updateRenderState(currentRenderState),
                    FADE_TIME
                );
            } else {
                return null;
            }
        };
        const timer = setTimeout(
            () => updateRenderState(initialState),
            FADE_TIME
        );
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageContent.content]);

    // This allows us to fade out the previous content when it's been changed.
    // it will momentarily render the previous content before fading out
    const contentToUse = contentJustChanged
        ? previousContentRef.current
        : pageContent;

    const { page } = useContext(SimulariumContext);
    const pageNumber = contentJustChanged ? page - 1 : page;
    const containerClassNames = classNames([
        styles.contentPanelWrapper,
        {
            [styles.fadeOut]: contentJustChanged,
        },
        { [styles.loaded]: renderState >= RenderState.RenderFadeIn },
    ]);

    return (
        <ContentPanel
            {...contentToUse}
            pageNumber={pageNumber}
            currentModule={currentModule}
            containerClass={containerClassNames}
        />
    );
};

export default ContentPanelTimer;
