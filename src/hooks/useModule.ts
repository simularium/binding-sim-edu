import { useCallback, useEffect, useRef } from "react";
import content from "../content";
import { Module, Section } from "../types";

const useModule = (currentModule: Module) => {
    const moduleInfo = useRef({
        totalPages: 0,
        totalBonusPages: 0,
        totalMainContentPages: 0,
        exampleTrajectoryPageNumber: -1,
    });

    const updateModuleInfo = useCallback(() => {
        const contentData = content[currentModule];
        moduleInfo.current.totalPages = contentData.length - 1;
        moduleInfo.current.totalBonusPages = contentData.filter(
            (page) => page.section === Section.BonusContent
        ).length;
        moduleInfo.current.totalMainContentPages =
            moduleInfo.current.totalPages - moduleInfo.current.totalBonusPages;
        moduleInfo.current.exampleTrajectoryPageNumber = contentData.findIndex(
            (page) => page.trajectoryUrl !== undefined
        );
    }, [currentModule]);

    useEffect(() => {
        updateModuleInfo();
    }, [updateModuleInfo]);

    return {
        totalPages: moduleInfo.current.totalPages,
        totalBonusPages: moduleInfo.current.totalBonusPages,
        totalMainContentPages: moduleInfo.current.totalMainContentPages,
        exampleTrajectoryPageNumber:
            moduleInfo.current.exampleTrajectoryPageNumber,
    };
};

export default useModule;
