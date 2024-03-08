import React from 'react';
import { ReactionType } from '../constants';

interface ReactionDisplayProps {
    reactionType: ReactionType;
}

const ReactionDisplay: React.FC<ReactionDisplayProps> = ({ reactionType }) => {
    return (
        <div>
            {reactionType === ReactionType.A_B_AB && (
                <div>
                    <span>A</span>
                    <span> + </span>
                    <span>B</span>
                    <span> ⇌ </span>
                    <span>AB</span>
                </div>
            )}
            {reactionType === ReactionType.A_C_AC && (
                <div>
                    <span>A</span>
                    <span> + </span>
                    <span>C</span>
                    <span> ⇌ </span>
                    <span>AC</span>
                </div>
            )}
            {reactionType === ReactionType.A_B_C_AB_AC && (
                <div>
                    <span>A</span>
                    <span> + </span>
                    <span>B</span>
                    <span> + </span>
                    <span>C</span>
                    <span> ⇌ </span>
                    <span>AB</span>
                    <span>AC</span>
                </div>
            )}
        </div>
    );
};

export default ReactionDisplay;