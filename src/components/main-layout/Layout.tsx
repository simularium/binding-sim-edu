import React, { ReactNode } from 'react';
import { Layout } from 'antd';

const { Header, Sider, Content } = Layout;

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
            <Header>{header}</Header>
            <Content>{content}</Content>
            <Header>{reactionPanel}</Header>
            <Layout>
                <Sider width={"25%"}>{leftPanel}</Sider>
                <Content>{centerPanel}</Content>
                <Sider width={"25%"}>{rightPanel}</Sider>
            </Layout>
        </Layout>
    );
};

export default MainLayout;