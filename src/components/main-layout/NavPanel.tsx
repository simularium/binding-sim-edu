import React, { useContext } from "react";
import { Flex } from "antd";
import PageIndicator from "../PageIndicator";
import Dropdown from "../shared/Dropdown";
import { SimulariumContext } from "../../simulation/context";
import LinkOut from "../icons/LinkOut";

interface NavPanelProps {
    title: string;
    page: number;
    total: number;
}

const NavPanel: React.FC<NavPanelProps> = ({ title, page, total }) => {
    const { setPage } = useContext(SimulariumContext);
    const helpMenuItems = [
        {
            key: "1",
            label: (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://allencell.org"
                >
                    <h4>
                        Allencell.org <LinkOut />
                    </h4>
                </a>
            ),
        },
    ];
    return (
        <Flex align="center" justify="space-between" style={{ height: "100%" }}>
            <h2>Binding affinity</h2>
            <PageIndicator title={title} page={page} total={total} />
            <Flex align="center" gap={12}>
                <a onClick={() => setPage(1)}>
                    <h4>Home</h4>
                </a>
                <Dropdown
                    label={<h4>Help</h4>}
                    items={helpMenuItems}
                ></Dropdown>
            </Flex>
        </Flex>
    );
};

export default NavPanel;
