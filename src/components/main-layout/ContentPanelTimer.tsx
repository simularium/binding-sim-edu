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
    NewContent = 1,
    StartFade = 2,
    FullyVisible = 3,
}

const ContentPanelTimer: React.FC<ContentPanelProps> = ({
    pageContent,
    currentModule,
}) => {
    const [renderState, setRenderState] = useState(RenderState.NewContent);
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
        const count: number = 1;
        const FADE_TIME = 100;
        let timer: NodeJS.Timeout;
        const updateRenderState = (count: number) => {
            previousContentRef.current = pageContent;
            setRenderState(count);
            count = count + 1;

            if (count <= RenderState.FullyVisible) {
                timer = setTimeout(() => updateRenderState(count), FADE_TIME);
            } else {
                return () => clearTimeout(timer);
            }
        };
        timer = setTimeout(() => updateRenderState(count), FADE_TIME);
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
        { [styles.loaded]: renderState >= RenderState.StartFade },
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