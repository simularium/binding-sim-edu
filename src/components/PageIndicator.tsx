import React, { useMemo } from "react";
import { Progress, Flex } from "antd";
import { map } from "lodash";
import classNames from "classnames";

import { moduleNames } from "../content";
import styles from "./page-indicator.module.css";
import { SimulariumContext } from "../simulation/context";

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
    const { setModule, completedModules } = React.useContext(SimulariumContext);
    const indexOfActiveModule: number = useMemo(() => {
        let toReturn = -1;
        map(moduleNames, (name, index) => {
            if (name === title) {
                toReturn = Number(index);
            }
        });
        return toReturn;
    }, [title]);

    const getModulePercent = (isActiveModule: boolean, moduleIndex: number) => {
        console.log(moduleIndex, indexOfActiveModule);
        if (isActiveModule) {
            return (page / total) * 100;
        } else if (completedModules.includes(moduleIndex)) {
            return 100;
        } else {
            return 0;
        }
    };
    return (
        <Flex align="center" justify="flex-end" className={styles.container}>
            {map(moduleNames, (name, index) => {
                const moduleIndex = Number(index);
                const isActiveModule = moduleIndex === indexOfActiveModule;
                return (
                    <div
                        key={index}
                        className={classNames(styles.progressBarWrapper, {
                            [styles.previous]:
                                moduleIndex <= indexOfActiveModule,
                            [styles.current]: isActiveModule,
                        })}
                        onClick={() => {
                            if (isActiveModule) {
                                return;
                            }
                            setModule(moduleIndex);
                        }}
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
