import React from 'react';
import { ReactionType } from '../../constants';
import { AGENT_AB_COLOR, AGENT_AC_COLOR, AGENT_A_COLOR, AGENT_B_COLOR, AGENT_C_COLOR } from '../../constants/colors';
import ReversibleArrows from './icons/ReversibleArrows';
import styles from './layout.module.css';

interface ReactionDisplayProps {
    reactionType: ReactionType;
}

const ReactionDisplay: React.FC<ReactionDisplayProps> = ({ reactionType }) => {
    
    const A = <span style={{ color: AGENT_A_COLOR }}>A</span>;
    const B = <span style={{ color: AGENT_B_COLOR }}>B</span>;
    const C = <span style={{ color: AGENT_C_COLOR }}>C</span>;
    const AB = <span style={{ color: AGENT_AB_COLOR }}>AB</span>;
    const AC = <span style={{ color: AGENT_AC_COLOR }}>AB</span>;

    return (
        <div className={styles.reaction}>
            {reactionType === ReactionType.A_B_AB && (
                <>
                    {A}
                    <span> + </span>
                    {B}
                    <ReversibleArrows />
                    {AB}
                </>
            )}
            {reactionType === ReactionType.A_C_AC && (
                <>
                    {A}
                    <span> + </span>
                    {C}
                    <ReversibleArrows />
                    {AC}
                </>
            )}
            {reactionType === ReactionType.A_B_C_AB_AC && (
                <>
                    {A}
                    <span> + </span>
                    {B}
                    <span> + </span>
                    {C}
                    <ReversibleArrows />
                    {AB}
                    {AC}
                </>
            )}
        </div>
    );
};

export default ReactionDisplay;