import React, { useCallback, useEffect, useRef } from "react";
import useWindowResize from "../../hooks/useWindowResize";

interface ResizeContainerProps {
    setWidth?: (width: number) => void;
    setHeight?: (width: number) => void;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const ResizeContainer: React.FC<ResizeContainerProps> = ({
    className,
    setWidth,
    setHeight,
    children,
    style,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const setSize = useCallback(() => {
        if (setWidth) {
            setWidth(containerRef.current?.offsetWidth || 0);
        }
        if (setHeight) {
            setHeight(containerRef.current?.offsetHeight || 0);
        }
    }, [setWidth, setHeight]);

    // set the size on mount
    useEffect(() => {
        setSize();
    }, [setSize]);

    // set the size on container change,
    // can happen when the side panels close
    useEffect(() => {
        setSize();
    }, [
        setSize,
        containerRef.current?.offsetWidth,
        containerRef.current?.offsetHeight,
    ]);

    useWindowResize(() => {
        setSize();
    });

    return (
        <div className={className || ""} ref={containerRef} style={style}>
            <>{children}</>
        </div>
    );
};

export default ResizeContainer;
