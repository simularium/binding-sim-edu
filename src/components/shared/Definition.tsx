import React from "react";
import { Popover } from "antd";

import { terms } from "../../content/glossary";

interface GlossaryTermProps {
    term: keyof typeof terms;
    displayValue?: string | JSX.Element;
}

const Definition: React.FC<GlossaryTermProps> = ({ term, displayValue }) => {
    const termData = terms[term];

    return (
        <Popover
            content={termData.definition}
            trigger="click"
            placement="bottom"
        >
            <a href="#">{displayValue || term}</a>
        </Popover>
    );
};

export default Definition;
