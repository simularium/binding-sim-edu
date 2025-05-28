import React from "react";
import ReversibleArrows from "../icons/ReversibleArrows";
import styles from "./layout.module.css";
import { A, B, C, AC, AB, D, AD } from "../agent-symbols";
import { Module, UiElement } from "../../types";
import InfoText from "../shared/InfoText";
import ReversibleArrows2 from "../icons/ReversibleArrows2";
import { Divider } from "antd";
import { LIGHT_GREY } from "../../constants/colors";

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
            {reactionType === Module.A_B_D && (
                <>
                    <AD />
                    <ReversibleArrows2 />
                    <D />
                    <span> + </span>
                    <A />
                    <Divider
                        type="vertical"
                        style={{
                            backgroundColor: LIGHT_GREY,
                        }}
                    />
                    <A />
                    <span> + </span>
                    <B />
                    <ReversibleArrows />
                    <AB />
                </>
            )}
            <InfoText uiElement={UiElement.ReactionDisplay} />
        </div>
    );
};

export default ReactionDisplay;
