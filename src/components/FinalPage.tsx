import { Flex } from "antd";
import diagram1Url from "../assets/antibody-diagram-01.png";
import diagram2Url from "../assets/antibody-diagram-02.png";
import styles from "./finalpage.module.css";

const FinalPage: React.FC = () => {
    return (
        <Flex className={styles.container}>
            <div className={styles.imageContainer}>
                <img
                    src={diagram1Url}
                    alt="antibody bound to antigen with lower affinity"
                />
            </div>
            <div className={styles.imageContainer}>
                <img
                    src={diagram2Url}
                    alt="antibody bound to antigen with higher affinity"
                />
            </div>
        </Flex>
    );
};

export default FinalPage;
