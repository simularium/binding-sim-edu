import React, { useEffect, useState } from "react";
import { valueType } from "antd/es/statistic/utils";
import { Flex } from "antd";

import QuizForm from "./QuizForm";
import VisibilityControl from "../shared/VisibilityControl";
import InputNumber from "../shared/InputNumber";
import { FormState } from "./types";
import styles from "./popup.module.css";
import { MICRO } from "../../constants";
import { useSimulariumUi } from "../../hooks/useSimulationContext";
import { AB, D } from "../agent-symbols";

interface KiQuestionProps {
    canAnswer: boolean;
    ki: number;
}

const KiQuestion: React.FC<KiQuestionProps> = ({ canAnswer, ki }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [formState, setFormState] = useState(FormState.Clear);

    const { module, addCompletedModule } = useSimulariumUi();

    useEffect(() => {
        setSelectedAnswer(null);
        setFormState(FormState.Clear);
    }, [module]);

    const getSuccessMessage = (answer: number) => (
        <>
            {answer} {MICRO}M{" "}
            <strong>
                K<sub>i</sub>
            </strong>{" "}
            means that adding {answer} {MICRO}M of inhibitor <D /> reduces the
            amount of <AB /> formed by half.
        </>
    );

    const handleAnswerSelection = (answer: valueType | null) => {
        setSelectedAnswer(Number(answer));
        if (formState === FormState.Incorrect) {
            setFormState(FormState.Clear);
        }
    };

    const handleSubmit = () => {
        const correctAnswer = ki;
        const tolerance = 1.5;
        if (selectedAnswer === null) {
            return;
        }
        if (formState === FormState.Incorrect) {
            setSelectedAnswer(null);
            setFormState(FormState.Clear);
            return;
        }
        const closeness =
            Math.abs(selectedAnswer - correctAnswer) / correctAnswer;
        if (closeness <= tolerance) {
            setFormState(FormState.Correct);
            addCompletedModule(module);
        } else {
            setFormState(FormState.Incorrect);
        }
    };

    const formContent = (
        <div className={styles.inputFormContent}>
            <p id="ki-question">
                You have now measured enough points to estimate the
                concentration of D where inhibition reduces binding by 50%
                (IC&#x2085;&#x2080;).
            </p>
            <p>
                If you're not sure, look at where the line crosses the 50% mark
                on the <strong>Equilibrium concentration plot.</strong>
            </p>
            <b>
                K<sub>i</sub> = ?
            </b>
            <Flex gap={8} align="baseline" style={{ maxWidth: 130 }}>
                <InputNumber
                    aria-labelledby="ki question"
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
                title="What is the inhibition constant?"
                formContent={formContent}
                onSubmit={handleSubmit}
                successMessage={getSuccessMessage(selectedAnswer!)}
                failureMessage='Visit the "Learn how to derive Ki" button above, then use the Equilibrium concentration plot to answer.'
                formState={formState}
                id="Ki Value"
            />
        </VisibilityControl>
    );
};

export default KiQuestion;
