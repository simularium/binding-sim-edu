import React, { useState } from "react";
import QuizForm from "./QuizForm";
import VisibilityControl from "./VisibilityControl";
import { ReactionType, kds } from "../constants";
import { FormState } from "../types";
import SuccessFeedback from "./SuccessFeedback";

interface KdQuestionProps {
    reactionType: ReactionType;
}

const KdQuestion: React.FC<KdQuestionProps> = ({ reactionType }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [formState, setFormState] = useState(FormState.Clear);

    const handleSubmit = () => {
        const correctAnswer = kds[reactionType];
        if (selectedAnswer === correctAnswer) {
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
            {formState === FormState.Incorrect && <p>Sorry that's incorrect</p>}
        </>
    );
    return (
        <VisibilityControl includedPages={[1, 2, 8]}>
            {formState === FormState.Correct ? (
                <SuccessFeedback
                    message={
                        "A and B have a high affinity for one another."
                    }
                />
            ) : (
            <QuizForm
                title="You reached the point where half of the binding sites of A are occupied."
                formContent={formContent}
                onSubmit={handleSubmit}
            />
            )}
        </VisibilityControl>
    );
};

export default KdQuestion;
