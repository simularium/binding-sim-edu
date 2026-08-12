import { Flex } from "antd";
import { AB, D } from "../agent-symbols";
import Fraction from "../shared/Fraction";
import { GRAY_COLOR } from "../plots/constants";

const unitStyle = { color: GRAY_COLOR };

const variables = {
    ki: (
        <>
            K<sub>i</sub>
        </>
    ),
    ic50: (
        <>
            IC<sub>50</sub>
        </>
    ),
    abMax: (
        <>
            [<AB />]<sub>max</sub>
        </>
    ),
};

const units = {
    constant: <>mM</>,
};

const reactionSteps = [
    {
        title: (
            <>
                First, run the experiment with no inhibitor present ([<D />] =
                0) to measure {variables.abMax} — the maximum amount of{" "}
                <AB /> that can form
            </>
        ),
        content: (
            <>
                {variables.abMax} = [<AB />]{" "}
                <span style={unitStyle}>
                    (at equilibrium, when [<D />] = 0)
                </span>
            </>
        ),
    },
    {
        title: (
            <>
                {variables.ki} (also called the {variables.ic50}) is the
                concentration of <D /> at equilibrium where [<AB />] has
                dropped to half of {variables.abMax}
            </>
        ),
        content: (
            <Flex align="center" gap={4}>
                <Fraction top={<>[<AB />]</>} bottom={variables.abMax} />
                <span>= ½</span>
            </Flex>
        ),
    },
    {
        title: (
            <>
                Therefore, {variables.ki} equals the concentration of <D />{" "}
                (at equilibrium) that reduces the formation of <AB /> by half
            </>
        ),
        content: (
            <Flex align="center" gap={4}>
                <span>{variables.ki} = </span>
                <span>
                    [<D />]
                </span>
                <span style={unitStyle}>{units.constant}</span>
            </Flex>
        ),
    },
];

const getEquationFromStep = (step: number) => {
    if (step < 2) {
        return <span>?</span>;
    }
    return (
        <span>
            [<D />]
        </span>
    );
};

export { variables, units, reactionSteps, getEquationFromStep };
