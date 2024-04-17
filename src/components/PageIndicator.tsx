import React from "react";
import { Progress, Flex } from "antd";
import { map } from "lodash";
import classNames from "classnames";

import { moduleNames } from "../content";
import styles from "./progressbar.module.css";

interface PageIndicatorProps {
    title: string;
    page: number;
    total: number;
}

const getNonCurrentModulePercent = (
    currentIndex: number,
    numberIndex: number
) => {
    if (numberIndex < currentIndex) {
        return 100;
    } else {
        return 0;
    }
};

const PageIndicator: React.FC<PageIndicatorProps> = ({
    title,
    page,
    total,
}) => {
    let currentIndex = -1;
    return (
        <Flex align="center" justify="flex-end" className={styles.container}>
            {map(moduleNames, (name, index) => {
                const indexNumber = Number(index);
                const isCurrentModule = name === title;
                if (isCurrentModule) {
                    currentIndex = indexNumber;
                }
                return (
                    <div
                        key={index}
                        className={classNames(styles.progressBarWrapper, {
                            [styles.active]: indexNumber <= currentIndex,
                        })}
                    >
                        <div className={styles.title}>{name}</div>
                        <Progress
                            className={styles.progressBar}
                            strokeWidth={4}
                            percent={
                                isCurrentModule
                                    ? (page / total) * 100
                                    : getNonCurrentModulePercent(
                                          currentIndex,
                                          indexNumber
                                      )
                            }
                            showInfo={false}
                        />

                        <div className={styles.pageNumber}>
                            {isCurrentModule ? `${page} / ${total}` : ""}
                        </div>
                    </div>
                );
            })}
        </Flex>
    );
};

export default PageIndicator;
