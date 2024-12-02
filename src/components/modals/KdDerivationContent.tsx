import { Flex } from "antd";
import { A, B, AB } from "../agent-symbols";
import Fraction from "../shared/Fraction";
import { GRAY_COLOR } from "../plots/constants";

const unitStyle = { color: GRAY_COLOR };

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
        title: "Definition of reaction rates",
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
        title: (
            <>
                At equilibrium, {variables.kd} is equal to the concentration of
                reactants over products
            </>
        ),
        content: (
            <Flex align="center" gap={4}>
                <span>{variables.kd} = </span>
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
        title: (
            <>
                When 50% of <A /> is bound, the concentration of the complex is
                equal to the concentration of <A />
            </>
        ),
        content: (
            <>
                [<A />] = [<AB />]
            </>
        ),
    },
    {
        title: (
            <>
                Therefore, {variables.kd} equals to the concentration of <B />{" "}
                (at equilibrium) when 50% of <A /> is bound
            </>
        ),

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

const getEquationFromStep = (step: number) => {
    console.log(step);
    if (step < 4) {
        return definitions.kd;
    } else if (step < 5) {
        return (
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
        );
    } else if (step === 5) {
        return (
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
            />
        );
    } else {
        return (
            <span>
                [<B />]
            </span>
        );
    }
};

export { variables, units, definitions, reactionSteps, getEquationFromStep };
