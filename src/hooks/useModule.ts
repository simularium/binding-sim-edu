import { useMemo } from "react";
import content from "../content";
import { Module, Section } from "../types";

const useModule = (currentModule: Module) => {
    const moduleInfo = useMemo(() => {
        const contentData = content[currentModule];
        const totalPages = contentData.length - 1;
        const totalBonusPages = contentData.filter(
            (page) => page.section === Section.BonusContent
        ).length;
        const totalMainContentPages = totalPages - totalBonusPages;
        const exampleTrajectoryPageNumber = contentData.findIndex(
            (page) => page.trajectoryUrl !== undefined
        );

        return {
            contentData,
            totalPages,
            totalBonusPages,
            totalMainContentPages,
            exampleTrajectoryPageNumber,
        };
    }, [currentModule]);
    return moduleInfo;
};

export default useModule;
