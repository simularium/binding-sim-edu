import React, { useState } from "react";
import QuizForm from "./QuizForm";
import VisibilityControl from "../VisibilityControl";
import { FormState } from "./types";

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
        </>
    );

    return (
        <VisibilityControl includedPages={[4]}>
            <QuizForm
                title="Which of the following is true about equilibrium?"
                formContent={formContent}
                onSubmit={handleSubmit}
                formState={formState}
                successMessage="It’s the forward and reverse reaction rates that are equal at equilibrium, not the concentrations of reactants and products. And binding and unbinding events don’t stop happening."
                failureMessage="Please try again. Helpful text?" // TODO: Add helpful text (this matches the current design)
                submitButtonLabel={
                    formState === FormState.Incorrect ? "Try Again" : "Submit"
                }
                minimizedTitle="Q:Equilibrium"
            />
        </VisibilityControl>
    );
};

export default EquilibriumQuestion;
