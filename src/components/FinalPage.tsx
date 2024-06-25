import styles from "./finalpage.module.css";
import { Flex } from "antd";

const FinalPage: React.FC = () => {
    return (
        <Flex className={styles.container}>
            <div className={styles.imageContainer}>
                <img
                    src="src/assets/antibody-diagram-01.png"
                    alt="antibody bound to antigen with lower affinity"
                />
            </div>
            <div className={styles.imageContainer}>
                <img
                    src="src/assets/antibody-diagram-02.png"
                    alt="antibody bound to antigen with higher affinity"
                />
            </div>
        </Flex>
    );
};

export default FinalPage;
