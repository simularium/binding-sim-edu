import React, { ReactNode } from "react";
import { Layout } from "antd";
const { Header, Sider, Content } = Layout;

import styles from "./layout.module.css";
import VisibilityControl from "../shared/VisibilityControl";
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
            <Header className={styles.reactionPanel}>{reactionPanel}</Header>
            <Layout>
                <VisibilityControl excludedPages={[0, 1]}>
                    <Sider
                        className={[styles.sidePanel, styles.left].join(" ")}
                        width={"25%"}
                    >
                        {leftPanel}
                    </Sider>
                </VisibilityControl>
                <Content className={styles.centerPanel}>{centerPanel}</Content>
                <VisibilityControl excludedPages={[0, 1]}>
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
