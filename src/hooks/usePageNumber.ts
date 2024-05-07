
import { useEffect } from "react";

const usePageNumber = (page: number, conditional: (page: number) => boolean, callback: () => void) => {
    useEffect(() => {
        if (conditional(page)) {
            callback();
        }

 
    }, [page, conditional, callback]);
};

export default usePageNumber;
