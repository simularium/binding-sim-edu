import React, { useState } from "react";
import { Flex, Steps } from "antd";

import { AB, D } from "../agent-symbols";

import styles from "./kd-derivation.module.css";
import { SecondaryButton } from "../shared/ButtonLibrary";
import {
    variables,
    reactionSteps,
    getEquationFromStep,
} from "./KiDerivationContent";

const KiDerivation: React.FC = () => {
    const [current, setCurrent] = useState(0);

    const next = () => {
        if (current >= reactionSteps.length - 1) {
            return setCurrent(0);
        }
        setCurrent(current + 1);
    };
    return (
        <Flex vertical className={styles.container}>
            <div>
                <p>
                    The inhibition constant {variables.ki} is analogous to{" "}
                    K<sub>d</sub>, but for our competitive inhibitor <D />. It
                    can be determined by finding the {variables.ic50} — the
                    concentration of <D /> at equilibrium where the amount of{" "}
                    <AB /> formed is reduced by half. You can think of it as{" "}
                    <em>
                        "how little <D /> do I need to cut <AB /> formation in
                        half?"
                    </em>{" "}
                </p>
                <ul>
                    <li>
                        <strong>high</strong> {variables.ki} ={" "}
                        <strong>low</strong> inhibitor potency
                    </li>
                    <li>
                        <strong>low</strong> {variables.ki} ={" "}
                        <strong>high</strong> inhibitor potency
                    </li>
                </ul>
                <p>
                    A reaction with a <strong>high</strong> {variables.ki}{" "}
                    means you need a lot of <D /> to cut <AB /> formation in
                    half, so the inhibitor has <strong>low</strong> potency. A{" "}
                    <strong>low</strong> {variables.ki} means you don't need
                    very much <D />, so the inhibitor has{" "}
                    <strong>high</strong> potency.
                </p>
            </div>
            <div>
                <Flex className={styles.titleSection}>
                    <h3 className={styles.title}>
                        Derivation of {variables.ki}
                    </h3>
                    <Flex
                        align="center"
                        gap={4}
                        className={styles.mainEquation}
                    >
                        <span>{variables.ki}</span> ={" "}
                        {getEquationFromStep(current)}
                    </Flex>
                    <SecondaryButton
                        style={{ margin: "0 8px" }}
                        onClick={() => next()}
                    >
                        {current < reactionSteps.length - 1
                            ? "Next"
                            : "Restart"}
                    </SecondaryButton>
                </Flex>
                <Steps
                    className={styles.steps}
                    direction="vertical"
                    current={current}
                    size="small"
                    items={reactionSteps.map((step) => ({
                        title: step.title,
                        description: step.content,
                    }))}
                ></Steps>
            </div>
        </Flex>
    );
};

export default KiDerivation;
