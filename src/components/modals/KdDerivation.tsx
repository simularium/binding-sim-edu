import React from "react";
import { B, A, AB } from "../agent-symbols";
import { Descriptions, Flex } from "antd";

import { GRAY_COLOR } from "../plots/constants";
import Fraction from "../shared/Fraction";

const variables = {
    kd: (
        <>
            K<sub>d</sub>
        </>
    ),
    kForward: (
        <em>
            k<sub>fwd</sub>
        </em>
    ),
    kReverse: (
        <em>
            k<sub>rev</sub>
        </em>
    ),
    rateForward: (
        <>
            rate <sub>fwd</sub>
        </>
    ),
    rateReverse: (
        <>
            rate <sub>rev</sub>
        </>
    ),
};

const units = {
    forward: (
        <>
            mM<sup>2</sup> / s
        </>
    ),
    reverse: <>mM / s</>,
    constant: <>mM</>,
};

const unitStyle = { color: GRAY_COLOR };

const definitions = {
    kd: <Fraction top={variables.kReverse} bottom={variables.kForward} />,
    forwardRate: (
        <>
            {variables.kForward} [
            <A />
            ][
            <B />] <span style={unitStyle}>{units.forward}</span>
        </>
    ),
    reverseRate: (
        <>
            {variables.kReverse} [<AB />]{" "}
            <span style={unitStyle}>{units.reverse}</span>
        </>
    ),
};
const reactionSteps = [
    {
        title: "Definition of the dissociation constant",
        content: (
            <Flex gap={4} align="center">
                <span>{variables.kd}</span> = {definitions.kd}
            </Flex>
        ),
    },
    {
        title: "Reaction rate equations",
        content: (
            <Flex gap={20}>
                <div>
                    {variables.rateReverse} = {definitions.reverseRate}
                </div>
                <div>
                    {variables.rateForward} = {definitions.forwardRate}
                </div>
            </Flex>
        ),
    },

    {
        title: "At equilibrium the rates are equal",
        content: (
            <>
                {variables.rateReverse} = {variables.rateForward}
            </>
        ),
    },
    {
        title: "Replace rates with equations",
        content: (
            <>
                {definitions.reverseRate} = {definitions.forwardRate}
            </>
        ),
    },
    {
        title: <>Rearrange</>,
        content: (
            <Flex align="center" gap={4}>
                <Fraction
                    top={variables.kReverse}
                    bottom={variables.kForward}
                />
                =
                <Fraction
                    top={
                        <>
                            [<A />
                            ][
                            <B />]
                        </>
                    }
                    bottom={
                        <>
                            [<AB />]
                        </>
                    }
                />
                <span style={unitStyle}>{units.constant}</span>
            </Flex>
        ),
    },
    {
        title: <>Replace rate constants with {variables.kd}</>,
        content: (
            <Flex align="center" gap={4}>
                <span>{variables.kd} = </span>
                <Fraction
                    top={
                        <>
                            [<A />
                            ][
                            <B />]
                        </>
                    }
                    bottom={
                        <>
                            [<AB />]
                        </>
                    }
                />
            </Flex>
        ),
    },
    {
        title: (
            <>
                When 50% of <A /> is bound:
            </>
        ),
        subtitle:
            "The concentration of the complex is equal to the concentration of A",
        content: (
            <>
                [<A />] = [<AB />]
            </>
        ),
    },
    {
        title: (
            <>
                Therefore, Kd is equal to the concentration of B at equilibrium,
                when 50% of A is bound
            </>
        ),
        subtitle:
            "Use the previous equation to replace the concentration of the complex with the concentration of A",
        content: (
            <Flex align="center" gap={4}>
                <span>{variables.kd} = </span>
                <Fraction
                    top={
                        <>
                            [<A />
                            ][
                            <B />]
                        </>
                    }
                    bottom={
                        <>
                            [<A />]
                        </>
                    }
                />{" "}
                ={" "}
                <span>
                    [<B />]
                </span>
            </Flex>
        ),
    },
];

const KdDerivation: React.FC = () => {
    return (
        <Flex vertical>
            <div>
                <p>
                    The dissociation constant (K<sub>d</sub>) is a measure of
                    the propensity of a complex to fall apart into its smaller
                    components. A reaction with a high K<sub>d</sub> means the
                    components have a low affinity and are more likely to fall
                    apart. A low K<sub>d</sub> means the components have a high
                    affinity and spend more time as a complex.
                </p>
                <p>
                    In this experiment, K<sub>d</sub> is the concentration of{" "}
                    <B /> at equilibrium when 50% of <A /> is bound to <B />.
                </p>
                <p>
                    <a
                        href="https://www.khanacademy.org/science/ap-chemistry-beta/x2eef969c74e0d802:equilibrium/x2eef969c74e0d802:magnitude-and-properties-of-the-equilibrium-constant/v/magnitude-of-the-equilibrium-constant"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Learn more about K<sub>d</sub> on Khan Academy
                    </a>
                </p>
            </div>
            <div>
                <h3>
                    Derivation of K<sub>d</sub>
                </h3>
                {reactionSteps.map((step, index) => (
                    <Descriptions key={index}>
                        <h3>
                            {index + 1}. {step.title}
                        </h3>
                        <div>
                            {/* {step.subtitle && <p>{step.subtitle}</p>} */}
                            <span>{step.content}</span>
                        </div>
                    </Descriptions>
                ))}
            </div>
        </Flex>
    );
};

export default KdDerivation;
