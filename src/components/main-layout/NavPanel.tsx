import React, { useContext } from "react";
import { Flex } from "antd";
import PageIndicator from "../PageIndicator";
import Dropdown from "../shared/Dropdown";
import { AppContext } from "../../context";
import content, { moduleNames } from "../../content";

const NavPanel: React.FC = () => {
    const { page, setPage, currentModule } = useContext(AppContext);
    const title = moduleNames[currentModule];
    const finalPageNumber = content[currentModule].length;

    const helpMenuItems = [
        {
            key: "1",
            label: (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://allencell.org"
                >
                    <h4>Allencell.org</h4>
                </a>
            ),
        },
    ];
    return (
        <Flex align="center" justify="space-between" style={{ height: "100%" }}>
            <h2>Binding affinity</h2>
            <PageIndicator title={title} page={page} total={finalPageNumber} />
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
