import React from "react";
import { Progress, Flex } from "antd";
import { map } from "lodash";
import { moduleNames } from "../../content";
import styles from "./progressbar.module.css";
import classNames from "classnames";

interface NavPanelProps {
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

const NavPanel: React.FC<NavPanelProps> = ({ title, page, total }) => {
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
                        className={classNames(styles.moduleBar, {
                            [styles.current]: isCurrentModule,
                        })}
                    >
                        <div className={styles.title}>{name}</div>
                        <Progress
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
                        {isCurrentModule && (
                            <div className={styles.pageNumber}>
                                {page} / {total}
                            </div>
                        )}
                    </div>
                );
            })}
        </Flex>
    );
};

export default NavPanel;
