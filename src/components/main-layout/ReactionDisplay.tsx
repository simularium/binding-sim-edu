import React from "react";
import ReversibleArrows from "../icons/ReversibleArrows";
import styles from "./layout.module.css";
import { A, B, C, AC, AB } from "../agent-symbols";
import { Module, UiElement } from "../../types";
import InfoText from "../shared/InfoText";

interface ReactionDisplayProps {
    reactionType: Module;
}

const ReactionDisplay: React.FC<ReactionDisplayProps> = ({ reactionType }) => {
    return (
        <div className={styles.reaction}>
            {reactionType === Module.A_B_AB && (
                <>
                    <A />
                    <span> + </span>
                    <B />
                    <ReversibleArrows />
                    <AB />
                </>
            )}
            {reactionType === Module.A_C_AC && (
                <>
                    <A />
                    <span> + </span>
                    <C />
                    <ReversibleArrows />
                    <AC />
                </>
            )}
            {reactionType === Module.A_B_C_AB_AC && (
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
            <InfoText uiElement={UiElement.ReactionDisplay} />
        </div>
    );
};

export default ReactionDisplay;
