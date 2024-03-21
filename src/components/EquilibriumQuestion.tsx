import React, { useState } from "react";
import QuizForm from "./QuizForm";
import VisibilityControl from "./VisibilityControl";

const EquilibriumQuestion: React.FC = () => {
    const [selectedAnswer, setSelectedAnswer] = useState("");

    const handleAnswerSelection = (answer: string) => {
        setSelectedAnswer(answer);
    };

    const handleSubmit = () => {
        if (selectedAnswer === "C") {
            console.log("Correct!");
        } else {
            console.log("Incorrect");
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

    const formContent = answers.map((answer, index) => (
        <li key={index}>
            <label>
                <input
                    type="radio"
                    value={answer.value}
                    checked={selectedAnswer === answer.value}
                    onChange={() => handleAnswerSelection(answer.value)}
                />
                {answer.label}
            </label>
        </li>
    ));
    return (
        <VisibilityControl includedPages={[1]}>
            <QuizForm
                title="Which of the following is true about equilibrium?"
                formContent={formContent}
                onSubmit={handleSubmit}
            />
        </VisibilityControl>
    );
};

export default EquilibriumQuestion;
