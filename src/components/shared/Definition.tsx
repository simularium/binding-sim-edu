import React from "react";
import { Popover } from "antd";

import { terms } from "../../content/glossary";
import LinkOut from "../icons/LinkOut";

interface GlossaryTermProps {
    term: keyof typeof terms;
    displayValue?: string | JSX.Element;
}

const Definition: React.FC<GlossaryTermProps> = ({ term, displayValue }) => {
    const termData = terms[term];
    const content = (
        <>
            {termData.definition}{" "}
            {termData.link && (
                <a
                    style={{ display: "block" }}
                    href={termData.link}
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    Learn More <LinkOut />
                </a>
            )}
        </>
    );
    return (
        <Popover
            content={content}
            trigger={["click", "hover"]}
            mouseEnterDelay={0.1}
            placement="bottom"
        >
            <a href="#!">{displayValue || term}</a>
        </Popover>
    );
};

export default Definition;
