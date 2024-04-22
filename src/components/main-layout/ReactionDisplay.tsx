import React from 'react';
import { ReactionType } from '../../constants';
import ReversibleArrows from './icons/ReversibleArrows';
import styles from './layout.module.css';
import { A } from '../agent-symbols/A';
import { AB } from '../agent-symbols/AB';
import { AC } from '../agent-symbols/AC';
import { B } from '../agent-symbols/B';
import { C } from '../agent-symbols/C';

interface ReactionDisplayProps {
    reactionType: ReactionType;
}

const ReactionDisplay: React.FC<ReactionDisplayProps> = ({ reactionType }) => {

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