import React, { ReactNode } from "react";
import { Layout } from "antd";
const { Header, Sider, Content } = Layout;

import VisibilityControl from "../shared/VisibilityControl";

import styles from "./layout.module.css";
import classNames from "classnames";
import { LayoutType, Section } from "../../types";
interface MainLayoutProps {
    landingPage: ReactNode;
    layout: LayoutType;
    header: ReactNode;
    leftPanel: ReactNode;
    rightPanel: ReactNode;
    content: ReactNode;
    centerPanel: ReactNode;
    reactionPanel: ReactNode;
    section: Section;
}

const MainLayout: React.FC<MainLayoutProps> = ({
    layout,
    header,
    leftPanel,
    rightPanel,
    content,
    centerPanel,
    reactionPanel,
    section,
    landingPage,
}) => {
    const getContent = () => {
        if (section === Section.LandingPage) {
            return landingPage;
        } else {
            return content;
        }
    };
    return (
        <Layout>
            <Header className={styles.navBar}>{header}</Header>
            <Content
                className={classNames([
                    styles.contentPanel,
                    {
                        [styles.overlay]:
                            layout === LayoutType.FullScreenOverlay,
                        [styles.noPadding]: section === Section.LandingPage,
                    },
                ])}
            >
                {getContent()}
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
