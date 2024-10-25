import React, { useState } from "react";
import QuizForm from "./QuizForm";
import VisibilityControl from "../shared/VisibilityControl";
import { FormState } from "./types";
import RadioComponent from "../shared/Radio";

const EquilibriumQuestion: React.FC = () => {
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [formState, setFormState] = useState(FormState.Clear);

    const handleAnswerSelection = (answer: string) => {
        setSelectedAnswer(answer);

        // instead of clicking the "try again" button they
        // can just select a different answer, in that case
        // we should reset the form state
        if (formState === FormState.Incorrect) {
            setFormState(FormState.Clear);
        }
    };

    const handleSubmit = () => {
        if (!selectedAnswer) {
            return;
        }
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
        { value: "A", label: "A. binding reactions stop happening" },
        { value: "B", label: "B. unbinding reactions stop happening" },
        {
            value: "C",
            label: "C. the amount of product stays roughly steady over time",
        },
        {
            value: "D",
            label: "D. the amount of products and reactants are equal",
        },
    ];

    const formContent = (
        <RadioComponent
            selectedAnswer={selectedAnswer}
            options={answers}
            onChange={(e) => handleAnswerSelection(e.target.value)}
        />
    );

    return (
        <VisibilityControl startPage={8} notInBonusMaterial>
            <QuizForm
                title="Which of the following is true about the reaction at equilibrium?"
                formContent={formContent}
                onSubmit={handleSubmit}
                formState={formState}
                successMessage="It’s the forward and reverse reaction rates that are equal at equilibrium, not the concentrations of reactants and products. And binding and unbinding events don’t stop happening."
                failureMessage="Please try again. Look carefully at what is happening in each of the plots to help find the answer."
                id="Equilibrium"
                resetForm={() => setFormState(FormState.Finished)}
            />
        </VisibilityControl>
    );
};

export default EquilibriumQuestion;
