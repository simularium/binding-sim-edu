import React, { ReactNode } from "react";
import { Layout } from "antd";
const { Header, Sider, Content } = Layout;

import VisibilityControl from "../shared/VisibilityControl";

import styles from "./layout.module.css";
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
    return (
        <Layout>
            <Header className={styles.navBar}>{header}</Header>
            <Content className={styles.contentPanel}>{content}</Content>
            <VisibilityControl excludedPages={[10]}>
                <Header className={styles.reactionPanel}>
                    {reactionPanel}
                </Header>
            </VisibilityControl>
            <Layout>
                <VisibilityControl excludedPages={[10]}>
                    <Sider
                        className={[styles.sidePanel, styles.left].join(" ")}
                        width={"25%"}
                    >
                        {leftPanel}
                    </Sider>
                </VisibilityControl>

                <Content className={styles.centerPanel}>{centerPanel}</Content>
                <VisibilityControl excludedPages={[10]}>
                    <Sider
                        className={[styles.sidePanel, styles.right].join(" ")}
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
