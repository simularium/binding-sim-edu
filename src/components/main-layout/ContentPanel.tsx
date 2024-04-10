import React from 'react';

import NextButton from '../shared/NextButton';

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
        <div>
            {title && <h3>{title}</h3>}
            <p>{content}</p>
            {callToAction && <p>{callToAction}</p>}
            {nextButton && <NextButton />}
        </div>
    );
};

export default ContentPanel;