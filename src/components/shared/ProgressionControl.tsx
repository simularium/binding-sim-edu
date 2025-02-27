import React, { useContext } from "react";
import { SimulariumContext } from "../../simulation/context";
import { BaseHandler, Module, ProgressionControlEvent } from "../../types";

import styles from "./progression-control.module.css";

type ProgressionControlChildProps =
    | React.InputHTMLAttributes<HTMLInputElement>
    | React.ButtonHTMLAttributes<HTMLButtonElement>;

type ProgressionControlChild = React.ReactElement<ProgressionControlChildProps>;
interface ProgressionControlProps {
    children: ProgressionControlChild;
    onPage: { [key in Module]?: number[] };
}

/**
 * Wraps an input element (button, slider, etc) and adds the progression
 * functionality to it. When the user interacts with the input, the page
 * is incremented in addition to the input's normal behavior.
 */
const ProgressionControl: React.FC<ProgressionControlProps> = ({
    children,
    onPage,
}) => {
    const { page, setPage, module } = useContext(SimulariumContext);
    const pagesToAdvance = onPage[module];
    const progress = () => {
        if (pagesToAdvance.includes(page)) {
                setPage(page + 1);
            }
        } 
    };

    const mergeHandlers = (baseHandler: BaseHandler) => {
        return (
            event: ProgressionControlEvent,
            optionalValue?: string | number | string[] | number[]
        ) => {
            const returnValue = baseHandler(event, optionalValue);
            // generally, all handlers are going to return undefined
            // right now we only have one function where we don't want to progress
            // if they haven't completed the action
            // and that's the onClick handler for the record equilibrium button
            if (returnValue === undefined) {
                progress();
            }
        };
    };

    const showHighlight =
        (Array.isArray(onPage) && onPage[0] === page) ||
        page === pagesToAdvance;

    const className = showHighlight ? styles.hintHighlight : "";

    return React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
            return child;
        }
        const reactElement = child as ProgressionControlChild;
        if (child.props.onClick) {
            return React.cloneElement(reactElement, {
                onClick: mergeHandlers(child.props.onClick as BaseHandler),
                className: className,
            });
        } else if (child.props.onChange) {
            return React.cloneElement(reactElement, {
                onChange: mergeHandlers(child.props.onChange as BaseHandler),
                className: className,
            });
        }

        return React.cloneElement(reactElement, {
            onClick: progress,
            style: { borderColor: "green" },
            className: className,
        });
    });
};

export default ProgressionControl;
