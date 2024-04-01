import React from 'react';
import { ReactionType } from '../../constants';
import { AGENT_AB_COLOR, AGENT_A_COLOR, AGENT_B_COLOR, AGENT_C_COLOR } from '../../constants/colors';

interface ReactionDisplayProps {
    reactionType: ReactionType;
}

const ReactionDisplay: React.FC<ReactionDisplayProps> = ({ reactionType }) => {
    
    const A = <span style={{ color: AGENT_A_COLOR }}>A</span>;
    const B = <span style={{ color: AGENT_B_COLOR }}>B</span>;
    const C = <span style={{ color: AGENT_C_COLOR }}>C</span>;
    const AB = <span style={{ color: AGENT_AB_COLOR }}>AB</span>;
    const AC = <span style={{ color: AGENT_AB_COLOR }}>AB</span>;

    return (
        <div>
            {reactionType === ReactionType.A_B_AB && (
                <div>
                    {A}
                    <span> + </span>
                    {B}
                    <span> ⇌ </span>
                    {AB}
                </div>
            )}
            {reactionType === ReactionType.A_C_AC && (
                <div>
                    {A}
                    <span> + </span>
                    {C}
                    <span> ⇌ </span>
                    {AC}
                </div>
            )}
            {reactionType === ReactionType.A_B_C_AB_AC && (
                <div>
                    {A}
                    <span> + </span>
                    {B}
                    <span> + </span>
                    {C}
                    <span> ⇌ </span>
                    {AB}
                    {AC}
                </div>
            )}
        </div>
    );
};

export default ReactionDisplay;