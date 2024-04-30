import { useEffect, useRef } from 'react';

const useWindowResize = (callback: () => void) => {
    const resizeEvent = useRef<NodeJS.Timeout | undefined>(undefined);
    useEffect(() => {
        window.addEventListener("resize", () => {
            clearTimeout(resizeEvent.current);
            resizeEvent.current = setTimeout(() => {
                clearTimeout(resizeEvent.current);
                callback();
            }, 200);
        });
    }, [callback]);
};

export default useWindowResize;

