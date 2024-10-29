import { useEffect, useRef } from "react";
import content from "../content";
import { Module, Section } from "../types";

const useModule = (currentModule: Module) => {
    const contentData = content[currentModule];
    const totalPages = contentData.length - 1;
    const totalBonusPages = contentData.filter(
        (page) => page.section === Section.BonusContent
    ).length;
    const totalMainContentPages = totalPages - totalBonusPages;
    const exampleTrajectoryPageNumber = contentData.findIndex(
        (page) => page.trajectoryUrl !== undefined
    );
    const moduleInfo = useRef({
        totalPages,
        totalBonusPages,
        totalMainContentPages,
        exampleTrajectoryPageNumber,
    });

    useEffect(() => {
        const contentData = content[currentModule];
        moduleInfo.current.totalPages = contentData.length - 1;
        moduleInfo.current.totalBonusPages = contentData.filter(
            (page) => page.section === Section.BonusContent
        ).length;
        moduleInfo.current.totalMainContentPages = totalPages - totalBonusPages;
        moduleInfo.current.exampleTrajectoryPageNumber = contentData.findIndex(
            (page) => page.trajectoryUrl !== undefined
        );
    }, [currentModule, totalBonusPages, totalPages]);

    return {
        totalPages: moduleInfo.current.totalPages,
        totalBonusPages: moduleInfo.current.totalBonusPages,
        totalMainContentPages: moduleInfo.current.totalMainContentPages,
        exampleTrajectoryPageNumber:
            moduleInfo.current.exampleTrajectoryPageNumber,
    };
};

export default useModule;
