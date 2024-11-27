import { Flex } from "antd";
import diagram1Url from "../assets/antibody-diagram-01.png";
import diagram2Url from "../assets/antibody-diagram-02.png";
import styles from "./binding-diagrams.module.css";
import { AGENT_A_COLOR, AGENT_B_COLOR } from "../constants/colors";

const BindingDiagrams: React.FC = () => {
    return (
        <Flex className={styles.container}>
            <div className={styles.imageContainer}>
                <h2>
                    <span style={{ color: AGENT_A_COLOR }}>Antibody 1 </span>
                    bound to{" "}
                    <span style={{ color: AGENT_B_COLOR }}>antigen</span>
                </h2>
                <img
                    src={diagram1Url}
                    alt="antibody bound to antigen with lower affinity"
                />
            </div>
            <div className={styles.imageContainer}>
                <h2>
                    <span style={{ color: AGENT_A_COLOR }}>Antibody 2 </span>
                    bound to{" "}
                    <span style={{ color: AGENT_B_COLOR }}>antigen</span>
                </h2>

                <img
                    src={diagram2Url}
                    alt="antibody bound to antigen with higher affinity"
                />
            </div>
        </Flex>
    );
};

export default BindingDiagrams;
