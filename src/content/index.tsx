import { A, AB, B } from "../components/agent-symbols";
import { ContentPanelProps } from "../components/main-layout/ContentPanel";
import Definition from "../components/shared/Definition";
import { Module } from "../types";

export const highAffinityContentArray: ContentPanelProps[] = [
    // making the content array 1 indexed to match the page numbers
    {
        content: "",
    },
    {
        title: "Experiment 1 - High affinity",
        content:
            "Congratulations! You’ve just joined a biology lab. Your mentor has asked you to measure the strength of the binding interaction between two types of molecules. These molecules are too small to see, even under a microscope. But what if we could somehow see what the molecules in the tube are doing? What do you think you’d see?",
        callToAction:
            "Click or tap the animated button to switch your view to a molecular simulation.",
    },
    {
        content: (
            <>
                Computer simulations can help us explore phenomena that are
                difficult to experience in reality. In this{" "}
                <Definition term="molecular simulation" />, the molecules are
                represented simply as circles.
            </>
        ),
        callToAction: "What happens to the molecules once you press play?",
    },
    {
        content: (
            <>
                When the reaction first starts, the concentration of each
                molecule changes rapidly as the two molecules, <A /> and <B />,
                bind to form <AB />. Eventually, the reaction reaches{" "}
                <Definition term="equilibrium" />, at which point the
                concentration of AB stays more or less consistent.
            </>
        ),
        callToAction:
            "Watch the Concentration over time plot until you think the reaction has reached equilibrium. Then, press the “Record” button to record the equilibrium concentration.",
    },
    {
        content:
            "The reaction reached equilibrium. What did you observe in the Concentration over time plot?",
        callToAction:
            "Test your knowledge and answer the question below before moving on.",
        nextButton: true,
    },
    {
        content: (
            <>
                The goal of these experiments is to figure out how tightly two
                molecules bind, or stick to each other. We call this{" "}
                <Definition term={"affinity"} />.
            </>
        ),
        callToAction: (
            <>
                Pausing the simulation reveals an interactive slider. With the
                simulation paused, adjust the concentration of <B /> with the
                slider and play the simulation again.
            </>
        ),
    },
    {
        content: (
            <>
                We want to understand the affinity of{" "}
                <Definition term="enzyme" /> <A /> and substrate <B />{" "}
                regardless of the concentration of{" "}
                <Definition term="substrate" />. Let’s repeat the experiment
                with a new concentration of <B />. We will keep the
                concentration of <A /> constant to avoid introducing more than
                one <Definition term="variable" /> at a time.
            </>
        ),
        callToAction: (
            <>
                For each new concentration of <B />, determine when equilibrium
                has been reached and then press the 'Record' button to plot
                their equilibrium concentrations.
            </>
        ),
    },
    {
        content: (
            <>
                We use the constant{" "}
                <Definition
                    term="KD"
                    displayValue={
                        <>
                            K<sub>d</sub>
                        </>
                    }
                />{" "}
                to compare affinities. K<sub>d</sub> is the concentration of{" "}
                <B /> where half the binding sites of <A /> are occupied at
                equilibrium.
            </>
        ),
        callToAction: (
            <>
                Let’s find K<sub>d</sub>: Repeat the experiment with different
                concentrations of <B /> until you have enough information to
                figure out the concentration of <B /> where half of the binding
                sites of <A /> would be occupied.
            </>
        ),
    },
    {
        content: (
            <>
                How do the different substrate concentrations of <A /> affect
                the reaction? Are there any similarities between the reactions
                when they reach equilibrium? Are there any differences?
            </>
        ),
        callToAction:
            "Test your knowledge and calculate the binding affinity below before moving on.",
        nextButton: true,
    },
    {
        title: "Antibodies and antigens - high affinity partners ",
        content: (
            <>
                The molecules you experimented with had a high affinity -
                similar to an <Definition term="antibody" /> and an{" "}
                <Definition term="antigen" /> it recognizes. Even if the antigen
                is present at low concentrations, the antibody stays tightly
                bound for a long time. This increases the total number of bound
                complexes at any given time and alerts the immune system of the
                antigen’s presence.
            </>
        ),
        nextButton: true,
        backButton: true,
    },
    {
        title: "Antibodies and antigens - high affinity partners ",
        content: (
            <>
                A pair of molecules’ binding affinity is determined by{" "}
                <Definition term="intermolecular forces" />. The first Antibody
                has a lower binding affinity for the Antigen than the second
                Antibody. Why, do you think, is this the case?
            </>
        ),
        nextButton: true,
        backButton: true,
    },
];

export const moduleNames = {
    [Module.A_B_AB]: "High Affinity",
    [Module.A_C_AC]: "Low Affinity",
    [Module.A_B_C_AB_AC]: "Competitive Binding",
};

export default {
    [Module.A_B_AB]: highAffinityContentArray,
} as { [key in Module]: ContentPanelProps[] };
