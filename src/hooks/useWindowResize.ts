import { useEffect, useRef } from 'react';

const useWindowResize = (callback: () => void) => {
    const resizeEvent = useRef<NodeJS.Timeout | undefined>(undefined);
    useEffect(() => {
        // creates an event listener that only 
        // calls the callback after the user has stopped resizing the window
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

