import React from "react";
import { Module, PageContent } from "../types";

import styles from "./landing-page.module.css";
import NextButton from "./shared/NextButton";
import classNames from "classnames";

interface LandingPageProps extends PageContent {
    module: Module;
}

const MODULE_CLASSNAMES: Record<Module, string> = {
    [Module.A_B_AB]: styles.highAffinity,
    [Module.A_C_AC]: styles.lowAffinity,
    [Module.A_B_D_AB]: styles.competitive,
};

const LandingPage: React.FC<LandingPageProps> = ({
    title,
    content,
    module,
    acknowledgment,
}) => {
    return (
        <div
            className={classNames(styles.container, MODULE_CLASSNAMES[module])}
        >
            <div className={styles.content}>
                <h1>{title}</h1>
                {content}
                <NextButton text="Start simulation experiments" />
            </div>
            <div className={styles.acknowledgment}>{acknowledgment}</div>
        </div>
    );
};

export default LandingPage;
