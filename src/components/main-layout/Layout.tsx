import React, { ReactNode, useContext } from "react";
import { Layout } from "antd";
const { Header, Sider, Content } = Layout;

import VisibilityControl from "../shared/VisibilityControl";

import styles from "./layout.module.css";
import classNames from "classnames";
import { SimulariumContext } from "../../simulation/context";
interface MainLayoutProps {
    header: ReactNode;
    leftPanel: ReactNode;
    rightPanel: ReactNode;
    content: ReactNode;
    centerPanel: ReactNode;
    reactionPanel: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({
    header,
    leftPanel,
    rightPanel,
    content,
    centerPanel,
    reactionPanel,
}) => {
    const { page, exampleTrajectoryPageNumber } = useContext(SimulariumContext);

    return (
        <Layout>
            <Header className={styles.navBar}>{header}</Header>
            <Content
                className={classNames([
                    styles.contentPanel,
                    {
                        [styles.finalPage]: page === 10,
                    },
                ])}
            >
                {content}
            </Content>
            <VisibilityControl notInBonusMaterial>
                <Header className={styles.reactionPanel}>
                    {reactionPanel}
                </Header>
            </VisibilityControl>
            <Layout>
                <VisibilityControl excludedPages={[9, 10]}>
                    <Sider
                        className={classNames([
                            styles.sidePanel,
                            styles.left,
                            {
                                [styles.example]:
                                    page === exampleTrajectoryPageNumber,
                            },
                        ])}
                        width={"25%"}
                    >
                        {leftPanel}
                    </Sider>
                </VisibilityControl>

                <Content className={styles.centerPanel}>{centerPanel}</Content>
                <VisibilityControl excludedPages={[9, 10]}>
                    <Sider
                        className={classNames([
                            styles.sidePanel,
                            styles.right,
                            {
                                [styles.example]:
                                    page === exampleTrajectoryPageNumber,
                            },
                        ])}
                        width={"25%"}
                    >
                        {rightPanel}
                    </Sider>
                </VisibilityControl>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
