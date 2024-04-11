import React, { ReactNode } from 'react';
import { Layout } from 'antd';
const { Header, Sider, Content } = Layout;

import styles from './layout.module.css';
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
    reactionPanel
}) => {
    return (
        <Layout>
            <Header className={styles.navBar}>{header}</Header>
            <Content className={styles.contentPanel}>{content}</Content>
            <Header className={styles.reactionPanel}>{reactionPanel}</Header>
            <Layout>
                <Sider width={"25%"}>{leftPanel}</Sider>
                <Content className={styles.centerPanel}>{centerPanel}</Content>
                <Sider width={"25%"}>{rightPanel}</Sider>
            </Layout>
        </Layout>
    );
};

export default MainLayout;