import { useContext, useEffect } from "react";
import { SimulariumContext } from "../simulation/context";

const usePageNumber = (
    conditional: (page: number) => boolean,
    callback: () => void
) => {
    const { page } = useContext(SimulariumContext);
    useEffect(() => {
        if (conditional(page)) {
            callback();
        }
    }, [page, conditional, callback]);
};

export default usePageNumber;
