import React from "react";

interface RenderAsHtmlProps {
    htmlString: string;
}

const RenderAsHtml: React.FC<RenderAsHtmlProps> = ({ htmlString }) => {
    // const formattedString = htmlString.replace(/Kd/g, "K<sub>d</sub>");
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: htmlString,
            }}
        />
    );
};

export default RenderAsHtml;
