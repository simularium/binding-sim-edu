import { ContentPanelProps } from "../components-temp-name/main-layout/ContentPanel";
import { ReactionType } from "../constants";

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
        content:
            "Computer simulations can help us explore phenomena that are difficult to experience in reality. In this molecular simulation, the molecules are represented simply as circles.",
        callToAction: "What happens to the molecules once you press play?",
    },
    {
        content:
            "When the reaction first starts, the concentration of each molecule changes rapidly as the two molecules- A and B-  bind to form AB. Eventually, the reaction reaches equilibrium, at which point the concentration of AB stays more or less consistent.",
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
        content:
            "The goal of these experiments is to figure out how tightly two molecules bind, or stick to each other. We call this affinity.",
        callToAction:
            "Pausing the simulation reveals an interactive slider. With the simulation paused, adjust the concentration of B with the slider and play the simulation again.",
    },
    {
        content:
            "We want to understand the affinity of enzyme A and substrate B regardless of the concentration of substrate. Let’s repeat the experiment with a new concentration of B. We will keep the concentration of A constant to avoid introducing more than one variable at a time.",
        callToAction:
            "For each new concentration of B, determine when equilibrium has been reached and then press the 'Record' button to plot their equilibrium concentrations.",
    },
    {
        content:
            "We use the constant Kd to compare affinities. Kd is the concentration of B where half the binding sites of A are occupied at equilibrium.",
        callToAction:
            "Let’s find Kd- Continue to repeat the experiment with different concentrations of B until you have found the point where half of the binding sites of A are occupied.",
    },
    {
        content:
            "How do the different substrate concentrations of B affect the reaction? Are there any similarities between the reactions when they reach equilibrium? Are there any differences?",
        callToAction:
            "Test your knowledge and calculate the binding affinity below before moving on.",
        nextButton: true,
    },
    {
        title: "Antibodies and antigens - high affinity partners ",
        content: "The molecules you experimented with had a high affinity- similar to an antibody and an antigen it recognizes. Even if the antigen is present at low concentrations, the antibody stays tightly bound for a long time. This increases the total number of bound complexes at any given time and alerts the immune system of the antigen’s presence.",
        nextButton: true,
        backButton: true
    },
];

export const moduleNames = {
    [ReactionType.A_B_AB] : "High Affinity",
    [ReactionType.A_C_AC] : "Low Affinity",
    [ReactionType.A_B_C_AB_AC] : "Competitive Binding",
}

export default {
    [ReactionType.A_B_AB]: highAffinityContentArray
} as {[key in ReactionType]: ContentPanelProps[]};