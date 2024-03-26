import React, { useState } from "react";
import QuizForm from "./QuizForm";
import VisibilityControl from "./VisibilityControl";
import { ReactionType, kds } from "../constants";

interface KdQuestionProps {
    reactionType: ReactionType;
}

const KdQuestion: React.FC<KdQuestionProps> = ({ reactionType }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    const handleSubmit = () => {
        const correctAnswer = kds[reactionType];
        if (selectedAnswer === correctAnswer) {
            alert("Correct!");
        } else {
            alert(`Incorrect ${correctAnswer}`);
        }
    };

    const formContent = (
        <>
            <p>
                Referencing the Equilibrium Concentration plot, what is the
                binding affinity?
            </p>
            <p>Kd = ?</p>
            <input
                type="number"
                value={selectedAnswer || ""}
                onChange={(e) => setSelectedAnswer(Number(e.target.value))}
            />
        </>
    );
    return (
        <VisibilityControl includedPages={[1, 2, 8]}>
            <QuizForm
                title="You reached the point where half of the binding sites of A are occupied."
                formContent={formContent}
                onSubmit={handleSubmit}
            />
        </VisibilityControl>
    );
};

export default KdQuestion;
