import React, { InputHTMLAttributes, useContext } from "react";
import { SimulariumContext } from "../simulation/context";

interface ProgressionControlProps {
    children: React.ReactElement<
        | InputHTMLAttributes<HTMLInputElement>
        | InputHTMLAttributes<HTMLButtonElement>
    >;
    onPage: number;
}

const ProgressionControl: React.FC<ProgressionControlProps> = ({
    children,
    onPage,
}) => {
    const { page, setPage } = useContext(SimulariumContext);
    const progress = () => {
        if (page === onPage) {
            setPage(page + 1);
        }
    };

    const mergeHandlers = (
        baseHandler:
            | React.MouseEventHandler<HTMLButtonElement>
            | React.ChangeEventHandler<HTMLInputElement>
    ) => {
        return (
            event:
                | React.MouseEvent<HTMLButtonElement>
                | React.ChangeEvent<HTMLInputElement>
        ) => {
            progress();
            baseHandler(
                event as React.MouseEvent<HTMLButtonElement> &
                    React.ChangeEvent<HTMLInputElement>
            );
        };
    };

    return React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
            return child;
        }
        const reactElement = child as React.ReactElement;
        if (child.props.onClick) {
            return React.cloneElement(reactElement, {
                onClick: mergeHandlers(
                    child.props
                        .onClick as React.MouseEventHandler<HTMLButtonElement>
                ),
            });
        } else if (child.props.onChange) {
            return React.cloneElement(reactElement, {
                onChange: mergeHandlers(
                    child.props
                        .onChange as React.ChangeEventHandler<HTMLInputElement>
                ),
            });
        }

        return React.cloneElement(reactElement, {
            onClick: progress,
        });
    });
};

export default ProgressionControl;
