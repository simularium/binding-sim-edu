import React, { ReactNode } from "react";
import { Layout } from "antd";
const { Header, Sider, Content } = Layout;

import VisibilityControl from "../shared/VisibilityControl";

import styles from "./layout.module.css";
import classNames from "classnames";
import { LayoutType } from "../../types";
interface MainLayoutProps {
    layout: LayoutType;
    header: ReactNode;
    leftPanel: ReactNode;
    rightPanel: ReactNode;
    content: ReactNode;
    centerPanel: ReactNode;
    reactionPanel: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({
    layout,
    header,
    leftPanel,
    rightPanel,
    content,
    centerPanel,
    reactionPanel,
}) => {
    return (
        <Layout>
            <Header className={styles.navBar}>{header}</Header>
            <Content
                className={classNames([
                    styles.contentPanel,
                    {
                        [styles.finalPage]:
                            layout === LayoutType.FullScreenOverlay,
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
                <VisibilityControl
                    conditionalRender={layout !== LayoutType.NoSidePanels}
                >
                    <Sider
                        className={classNames([
                            styles.sidePanel,
                            styles.left,
                            {
                                [styles.example]:
                                    layout === LayoutType.PreComputedSimulation,
                            },
                        ])}
                        width={"25%"}
                    >
                        {leftPanel}
                    </Sider>
                </VisibilityControl>

                <Content className={styles.centerPanel}>{centerPanel}</Content>
                <VisibilityControl
                    conditionalRender={layout !== LayoutType.NoSidePanels}
                >
                    <Sider
                        className={classNames([
                            styles.sidePanel,
                            styles.right,
                            {
                                [styles.example]:
                                    layout === LayoutType.PreComputedSimulation,
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
