import { useEffect, useRef, useState } from "react";
import useWindowResize from "../hooks/useWindowResize";
import styles from "./finalpage.module.css";

const FinalPage: React.FC = () => {
    const shorterImage = useRef<HTMLImageElement>(null);
    const [height, setHeight] = useState<number>(0);
    useEffect(() => {
        setHeight(shorterImage.current?.offsetHeight || 0);
    }, []);

    useWindowResize(() => setHeight(shorterImage.current?.offsetHeight || 0));
    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <div>
                    <img
                        ref={shorterImage}
                        style={{ maxWidth: "100%" }}
                        src="src/assets/AgAbInterface_WithInset.png"
                        alt="hero"
                    />
                </div>
                <div style={{ height: height }}>
                    <img
                        src="src/assets/Schematic_Hbonds_v2-strong.png"
                        alt="hero"
                    />
                </div>
            </div>
            <div className={styles.imageContainer}>
                <div>
                    <img
                        ref={shorterImage}
                        style={{ maxWidth: "100%" }}
                        src="src/assets/AgAbInterface_mutated_WithInset.png"
                        alt="hero"
                    />
                </div>
                <div style={{ height: height }}>
                    <img
                        src="src/assets/Schematic_Hbonds_v2-weak.png"
                        alt="hero"
                    />
                </div>
            </div>
        </div>
    );
};

export default FinalPage;
