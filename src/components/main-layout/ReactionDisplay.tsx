import React, { useContext } from "react";
import ReversibleArrows from "../icons/ReversibleArrows";
import styles from "./layout.module.css";
import { A, B, C, AC, AB } from "../agent-symbols";
import { Module } from "../../types";
import { AppContext } from "../../context/context";

const ReactionDisplay: React.FC = () => {
    const { currentModule } = useContext(AppContext);
    return (
        <div className={styles.reaction}>
            {currentModule === Module.A_B_AB && (
                <>
                    <A />
                    <span> + </span>
                    <B />
                    <ReversibleArrows />
                    <AB />
                </>
            )}
            {currentModule === Module.A_C_AC && (
                <>
                    <A />
                    <span> + </span>
                    <C />
                    <ReversibleArrows />
                    <AC />
                </>
            )}
            {currentModule === Module.A_B_C_AB_AC && (
                <>
                    <A />
                    <span> + </span>
                    <B />
                    <span> + </span>
                    <C />
                    <ReversibleArrows />
                    <AB />
                    <AC />
                </>
            )}
        </div>
    );
};

export default ReactionDisplay;
