import React, { useState } from "react";
import { Flex, Steps } from "antd";

import { B, A } from "../agent-symbols";

import styles from "./kd-derivation.module.css";
import { SecondaryButton } from "../shared/ButtonLibrary";
import {
    variables,
    reactionSteps,
    getEquationFromStep,
} from "./KdDerivationContent";

const KdDerivation: React.FC = () => {
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
                    The dissociation constant {variables.kd} is a measure of the
                    propensity of a complex to fall apart into its smaller
                    components. As is shown below, {variables.kd} equals
                    concentration of <B /> at equilibrium when 50% of <A /> is
                    bound to <B />. You can think of it as{" "}
                    <em>
                        "how little <B /> do I need to bind to half of <A />
                        ?"
                    </em>{" "}
                </p>
                <ul>
                    <li>
                        <strong>high</strong> {variables.kd} ={" "}
                        <strong>low</strong> affinity
                    </li>
                    <li>
                        <strong>low</strong> {variables.kd} ={" "}
                        <strong>high</strong> affinity
                    </li>
                </ul>
                <p>
                    A reaction with a <strong>high</strong> {variables.kd} means
                    you need a lot of <B /> so the components have a{" "}
                    <strong>low</strong> affinity and are more likely to fall
                    apart. A <strong>low</strong> {variables.kd} means you don't
                    need very much <B /> so the components have a{" "}
                    <strong>high</strong> affinity and spend more time as a
                    complex.
                </p>

                <p>
                    <a
                        href="https://www.khanacademy.org/science/ap-chemistry-beta/x2eef969c74e0d802:equilibrium/x2eef969c74e0d802:magnitude-and-properties-of-the-equilibrium-constant/v/magnitude-of-the-equilibrium-constant"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Learn more about {variables.kd} on Khan Academy
                    </a>
                </p>
            </div>
            <div>
                <Flex className={styles.titleSection}>
                    <h3 className={styles.title}>
                        Derivation of {variables.kd}
                    </h3>
                    <Flex
                        align="center"
                        gap={4}
                        className={styles.mainEquation}
                    >
                        <span>{variables.kd}</span> ={" "}
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

export default KdDerivation;
