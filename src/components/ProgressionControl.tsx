import React, { useContext } from "react";
import { SimulariumContext } from "../simulation/context";
import {
  ProgressionControlProps,
  ProgressionControlChild,
  ProgressionMouseEvent,
  ProgressionInputEvent,
} from "../types";

/**
 * Wraps an input element (button, slider, etc) and adds the progression
 * functionality to it. When the user interacts with the input, the page
 * is incremented in addition to the input's normal behavior.
 */
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

  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }
    const reactElement = child as ProgressionControlChild;
    if (child.props.onClick) {
      return React.cloneElement(reactElement, {
        onClick: (event: ProgressionMouseEvent) => {
          reactElement.props.onClick?.(event);
          progress();
        },
      });
    } else if (child.props.onChange) {
      return React.cloneElement(reactElement, {
        onChange: (event: ProgressionInputEvent) => {
          reactElement.props.onChange?.(event);
          progress();
        },
      });
    }

    return React.cloneElement(reactElement, {
      onClick: progress,
    });
  });
};

export default ProgressionControl;
