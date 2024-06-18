import React, { useContext } from "react";
import { AppContext } from "../../context";
import { BaseHandler, ProgressionControlEvent } from "../../types";

type ProgressionControlChildProps =
    | React.InputHTMLAttributes<HTMLInputElement>
    | React.ButtonHTMLAttributes<HTMLButtonElement>;

type ProgressionControlChild = React.ReactElement<ProgressionControlChildProps>;
interface ProgressionControlProps {
    children: ProgressionControlChild;
    onPage: number | number[];
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
    const { page, setPage } = useContext(AppContext);
    const progress = () => {
        if (Array.isArray(onPage)) {
            if (onPage.includes(page)) {
                setPage(page + 1);
            }
        } else if (page === onPage) {
            setPage(page + 1);
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

    return React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
            return child;
        }
        const reactElement = child as ProgressionControlChild;
        if (child.props.onClick) {
            return React.cloneElement(reactElement, {
                onClick: mergeHandlers(child.props.onClick as BaseHandler),
            });
        } else if (child.props.onChange) {
            return React.cloneElement(reactElement, {
                onChange: mergeHandlers(child.props.onChange as BaseHandler),
            });
        }

        return React.cloneElement(reactElement, {
            onClick: progress,
        });
    });
};

export default ProgressionControl;
