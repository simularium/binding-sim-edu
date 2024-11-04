import { Flex, Divider } from "antd";
import React from "react";
import { LIGHT_GREY } from "../../constants/colors";

interface FractionProps {
    top: string | JSX.Element;
    bottom: string | JSX.Element;
}

const Fraction: React.FC<FractionProps> = ({ top, bottom }) => {
    return (
        <Flex vertical align="center" style={{ width: "max-content" }}>
            <span>{top}</span>
            <Divider style={{ margin: 0, borderColor: LIGHT_GREY }} />
            <span>{bottom}</span>
        </Flex>
    );
};

export default Fraction;
