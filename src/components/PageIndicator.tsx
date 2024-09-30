import React from "react";
import { Progress, Flex } from "antd";
import { map } from "lodash";
import classNames from "classnames";

import { moduleNames } from "../content";
import styles from "./page-indicator.module.css";

interface PageIndicatorProps {
    title: string;
    page: number;
    total: number;
}

const PageIndicator: React.FC<PageIndicatorProps> = ({
    title,
    page,
    total,
}) => {
    let indexOfActiveModule = -1;

    const getModulePercent = (isActiveModule: boolean, moduleIndex: number) => {
        if (isActiveModule) {
            return (page / total) * 100;
        } else if (moduleIndex < indexOfActiveModule) {
            return 100;
        } else {
            return 0;
        }
    };
    return (
        <Flex align="center" justify="flex-end" className={styles.container}>
            {map(moduleNames, (name, index) => {
                const moduleIndex = Number(index);
                const isActiveModule = name === title;
                if (isActiveModule) {
                    indexOfActiveModule = moduleIndex;
                }
                return (
                    <div
                        key={index}
                        className={classNames(styles.progressBarWrapper, {
                            [styles.previous]:
                                moduleIndex <= indexOfActiveModule,
                            [styles.current]: isActiveModule,
                        })}
                    >
                        <div className={styles.title}>{name}</div>
                        <Progress
                            className={styles.progressBar}
                            size={["100%", 4]}
                            percent={getModulePercent(
                                isActiveModule,
                                moduleIndex
                            )}
                            showInfo={false}
                        />
                    </div>
                );
            })}
        </Flex>
    );
};

export default PageIndicator;
