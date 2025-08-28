import React, { useContext, useRef, useState } from "react";
import QuizForm from "./QuizForm";
import VisibilityControl from "../shared/VisibilityControl";
import { FormState } from "./types";
import RadioComponent from "../shared/Radio";
import { EQUILIBRIUM_QUIZ_ID } from "../../constants";
import { SimulariumContext } from "../../simulation/context";
import { Module } from "../../types";

const EquilibriumQuestion: React.FC = () => {
    const id = EQUILIBRIUM_QUIZ_ID;
    const { page, quizQuestion, module } = useContext(SimulariumContext);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [formState, setFormState] = useState(FormState.Clear);
    const firstVisiblePage = useRef<{ page: number; module: Module }>({
        page: Infinity,
        module: Module.A_B_AB,
    });
    const hasBeenInitialized = firstVisiblePage.current.page !== Infinity;

    // quiz questions have a start page, but they can continue to be visible
    // throughout the module, so we need to track the first visible page
    if (quizQuestion === id && !hasBeenInitialized) {
        firstVisiblePage.current = { page, module: module };
    }
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
    // Hide the question if the user has already answered correctly, and moved on
    // to the next page
    const hide =
        page > firstVisiblePage.current?.page &&
        formState === FormState.Correct;

    return (
        <VisibilityControl
            startPage={firstVisiblePage.current.page}
            conditionalRender={!hide}
            notInBonusMaterial
        >
            <QuizForm
                title="Which of the following is true about the reaction at equilibrium?"
                formContent={formContent}
                onSubmit={handleSubmit}
                formState={formState}
                successMessage={
                    <>
                        It’s the forward and reverse reaction{" "}
                        <strong>rates</strong> that are equal at equilibrium,
                        not the concentrations of reactants and products. And
                        binding and unbinding events don’t stop happening.
                    </>
                }
                failureMessage="Please try again. Look carefully at what is happening in each of the plots to help find the answer."
                id="Equilibrium"
            />
        </VisibilityControl>
    );
};

export default EquilibriumQuestion;
