import React, { useState } from "react";
import QuizForm from "./QuizForm";
import VisibilityControl from "../Shared/VisibilityControl";
import { ReactionType, kds } from "../../constants";
import { FormState } from "./types";

interface KdQuestionProps {
    reactionType: ReactionType;
}

const KdQuestion: React.FC<KdQuestionProps> = ({ reactionType }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [formState, setFormState] = useState(FormState.Clear);

    const handleSubmit = () => {
        const correctAnswer = kds[reactionType];
        const tolerance = 5;
        if (selectedAnswer === null) {
            // No answer selected
            return;
        }
        
        if (
            selectedAnswer <= correctAnswer + tolerance &&
            selectedAnswer >= correctAnswer - tolerance
        ) {
            setFormState(FormState.Correct);
        } else {
            setFormState(FormState.Incorrect);
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
        <VisibilityControl includedPages={[8]}>
            <QuizForm
                title="You reached the point where half of the binding sites of A are occupied."
                formContent={formContent}
                onSubmit={handleSubmit}
                successMessage="A and B have a high affinity for one another."
                failureMessage="Visit the “Learn how to derive Kd” button above, then use the Equilibrium concentration plot to answer."
                formState={formState}
                minimizedTitle="Q:Kd Value"
            />
        </VisibilityControl>
    );
};

export default KdQuestion;
