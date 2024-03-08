import React from 'react';

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
}) => {
    return (
        <div>
            {title && <h1>{title}</h1>}
            <p>{content}</p>
            {callToAction && <p>{callToAction}</p>}
        </div>
    );
};

export default ContentPanel;