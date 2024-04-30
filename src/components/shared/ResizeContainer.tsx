import React, { useEffect, useRef } from "react";
import useWindowResize from "../../hooks/useWindowResize";

interface ResizeContainerProps {
    setWidth: (width: number) => void;
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
    // set the size on mount
    useEffect(() => {
        setWidth(containerRef.current?.offsetWidth || 0);
        if (setHeight) {
            setHeight(containerRef.current?.offsetHeight || 0);
        }
    }, [setWidth, setHeight]);

    useWindowResize(() => {
        setWidth(containerRef.current?.offsetWidth || 0);
        if (setHeight) {
            setHeight(containerRef.current?.offsetHeight || 0);
        }
    });

    return (
        <div className={className || ""} ref={containerRef} style={style}>
            <>{children}</>
        </div>
    );
};

export default ResizeContainer;
