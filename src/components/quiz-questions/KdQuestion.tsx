import React, { useContext, useEffect, useState } from "react";
import { valueType } from "antd/es/statistic/utils";
import { Flex } from "antd";

import QuizForm from "./QuizForm";
import VisibilityControl from "../shared/VisibilityControl";
import InputNumber from "../shared/InputNumber";
import { FormState } from "./types";
import styles from "./popup.module.css";
import { MICRO } from "../../constants";
import { SimulariumContext } from "../../simulation/context";

interface KdQuestionProps {
    kd: number;
    canAnswer: boolean;
}

const KdQuestion: React.FC<KdQuestionProps> = ({ kd, canAnswer }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [formState, setFormState] = useState(FormState.Clear);

    const { module } = useContext(SimulariumContext);

    useEffect(() => {
        setSelectedAnswer(null);
        setFormState(FormState.Clear);
    }, [module]);

    const getSuccessMessage = (selectedAnswer: number) => {
        if (selectedAnswer < 5) {
            return (
                <>
                    {selectedAnswer} {MICRO}M is considered a{" "}
                    <strong>
                        low K<sub>d</sub>
                    </strong>
                    , which means A and B have a <strong>high affinity</strong>{" "}
                    for one another because it takes a low amount of B to create
                    the complex.
                </>
            );
        } else {
            return (
                <>
                    {selectedAnswer} {MICRO}M is considered a{" "}
                    <strong>
                        high K<sub>d</sub>
                    </strong>
                    , which means A and C have a <strong>low affinity</strong>{" "}
                    for one another because it takes a lot of C to create the
                    complex.
                </>
            );
        }
    };

    const handleAnswerSelection = (answer: valueType | null) => {
        setSelectedAnswer(Number(answer));

        // instead of clicking the "try again" button they
        // can just select a different answer, in that case
        // we should reset the form state
        if (formState === FormState.Incorrect) {
            setFormState(FormState.Clear);
        }
    };
    const handleSubmit = () => {
        const correctAnswer = kd;
        const tolerance = 1.5;
        if (selectedAnswer === null) {
            // No answer selected
            return;
        }
        // If they already submitted an incorrect answer
        // hitting the submit button again will reset the form
        if (formState === FormState.Incorrect) {
            setSelectedAnswer(null);
            setFormState(FormState.Clear);
            return;
        }
        const closeness =
            Math.abs(selectedAnswer - correctAnswer) / correctAnswer;
        if (closeness <= tolerance) {
            setFormState(FormState.Correct);
        } else {
            setFormState(FormState.Incorrect);
        }
    };

    const formContent = (
        <div className={styles.inputFormContent}>
            <p id="kd question">
                You have now measured enough points to estimate the value of B
                where half of the binding sites of A are occupied.
            </p>
            <b>
                K<sub>d</sub> = ?
            </b>
            <Flex gap={8} align="baseline" style={{ maxWidth: 130 }}>
                <InputNumber
                    aria-labelledby="kd question"
                    value={selectedAnswer || ""}
                    onChange={handleAnswerSelection}
                    placeholder="Type value..."
                />
                <span> {MICRO}M</span>
            </Flex>
        </div>
    );
    return (
        <VisibilityControl conditionalRender={canAnswer} notInBonusMaterial>
            <QuizForm
                title="What is the binding affinity?"
                formContent={formContent}
                onSubmit={handleSubmit}
                successMessage={getSuccessMessage(selectedAnswer!)}
                failureMessage="Visit the “Learn how to derive Kd” button above, then use the Equilibrium concentration plot to answer."
                formState={formState}
                id="Kd Value"
            />
        </VisibilityControl>
    );
};

export default KdQuestion;
