import React, { useState } from "react";
import QuizForm from "./QuizForm";
import VisibilityControl from "./VisibilityControl";
import SuccessFeedback from "./SuccessFeedback";

enum FormState {
    Correct = "Correct",
    Incorrect = "Incorrect",
    Clear = "Clear",
}

const EquilibriumQuestion: React.FC = () => {
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [formState, setFormState] = useState(FormState.Clear);

    const handleAnswerSelection = (answer: string) => {
        setSelectedAnswer(answer);
    };

    const handleSubmit = () => {
        // If they already submitted an incorrect answer
        // hitting the submit button again will reset the form
        if (formState === FormState.Incorrect) {
            setSelectedAnswer("");
            setFormState(FormState.Clear);
            return;
        }
        // Otherwise, check the answer
        if (selectedAnswer === "C") {
            setFormState(FormState.Correct);
        } else {
            setFormState(FormState.Incorrect);
        }
    };

    const answers = [
        { value: "A", label: "binding reactions stop happening" },
        { value: "B", label: "unbinding reactions stop happening" },
        {
            value: "C",
            label: "the amount of products and reactants stays roughly the same over time",
        },
        { value: "D", label: "the amount of products and reactants are equal" },
    ];

    const formContent = (
        <>
            <ul>
                {answers.map((answer, index) => (
                    <li key={index}>
                        <label>
                            <input
                                type="radio"
                                value={answer.value}
                                checked={selectedAnswer === answer.value}
                                onChange={() =>
                                    handleAnswerSelection(answer.value)
                                }
                            />
                            {answer.label}
                        </label>
                    </li>
                ))}
            </ul>
            {formState === FormState.Incorrect && <p>Sorry that's incorrect</p>}
        </>
    );
    // TODO: this should only be shown at 4, but need to merge other changes before we can 
    // get to page 4 
    return (
        <VisibilityControl includedPages={[2, 4]}>
            {formState === FormState.Correct ? (
                <SuccessFeedback
                    message={
                        "It’s the forward and reverse reaction rates that are equal at equilibrium, not the concentrations of reactants and products. And binding and unbinding events don’t stop happening."
                    }
                />
            ) : (
                <QuizForm
                    title="Which of the following is true about equilibrium?"
                    formContent={formContent}
                    onSubmit={handleSubmit}
                    submitButtonLabel={formState === FormState.Incorrect ? "Try Again" : "Submit"}
                />
            )}
        </VisibilityControl>
    );
};

export default EquilibriumQuestion;
