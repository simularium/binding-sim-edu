import FinalPage from "../components/FinalPage";
import StartExperiment from "../components/StartExperiment";
import { A, AB, B } from "../components/agent-symbols";
import { ContentPanelProps } from "../components/main-layout/ContentPanel";
import Definition from "../components/shared/Definition";
import { MICRO } from "../constants";
import { LayoutType, Module, PageContent, Section } from "../types";

export const highAffinityContentArray: PageContent[] = [
    // making the content array 1 indexed to match the page numbers
    {
        content: "",
        section: Section.Introduction,
        layout: LayoutType.FullScreen,
    },
    {
        content:
            "Congratulations! You’ve just joined a biology lab. Your mentor has asked you to measure the strength of the binding interaction between two types of molecules. These molecules are too small to see, even under a microscope. But what if we could somehow see what the molecules in the tube are doing? What do you think you’d see?",
        callToAction:
            "Click or tap the animated button to switch your view to a molecular simulation.",
        section: Section.Introduction,
        layout: LayoutType.SimulationWindow,
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
        section: Section.Introduction,
        layout: LayoutType.SimulationWindow,
    },
    {
        content: (
            <>
                As the simulation plays, the molecules move by a random walk.
                Watch what happens when they bump into each other. What do you
                think the "Reaction events over time" graph is showing?
            </>
        ),
        callToAction:
            "After you've observed the simulation, click 'Lab view' to see what the cuvette looks like now.",
        section: Section.Introduction,
        layout: LayoutType.SimulationWindow,
    },
    {
        content: (
            <>
                The clear liquid is slowly turning yellow as the simulation
                progresses. Can you estimate the concentration of <AB /> after
                about 20 simulated {MICRO}seconds have elapsed?
            </>
        ),
        callToAction: "Click 'Molecular view' to switch back.",
        section: Section.Introduction,
        layout: LayoutType.SimulationWindow,
    },
    {
        title: "Start the Experiment",
        content: (
            <>
                Now we're going to use this simulation to make measurements.
                We're going to increase the timestep so the experiments are
                fast.
            </>
        ),
        actionButton: <StartExperiment />,
        callToAction:
            "Click the 'Start experiment' button to reset the simulation and begin by pressing play!",
        section: Section.Introduction,
        layout: LayoutType.SimulationWindow,
    },
    {
        content: (
            <>
                Now we're going to use this simulation to make measurements.
                We're going to increase the timestep so the experiments are
                fast.
            </>
        ),
        actionButton: <StartExperiment />,
        callToAction:
            "Click the 'Start experiment' button to reset the simulation and begin by pressing play!",
        section: Section.Experiment,
        layout: LayoutType.SimulationWindow,
    },
    {
        content: (
            <>
                When the reaction first starts, the concentration of each
                molecule changes rapidly as the two molecules, <A /> and <B />,
                bind to form <AB />. Eventually, the reaction reaches{" "}
                <Definition term="equilibrium" />, at which point the
                concentration of <AB /> stays more or less consistent.
            </>
        ),
        callToAction:
            "Watch the Concentration over time plot until you think the reaction has reached equilibrium. Then, press the “Record” button to record the equilibrium concentration.",
        section: Section.Experiment,
        layout: LayoutType.SimulationWindow,
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
                If you haven’t already done so, pause the simulation and use the
                now visible interactive slider under “Agent concentrations” to
                adjust the concentration of B and play the simulation again.
            </>
        ),
        section: Section.Experiment,
        layout: LayoutType.SimulationWindow,
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
        section: Section.Experiment,
        layout: LayoutType.SimulationWindow,
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
                to compare affinities. K<sub>d</sub> can by determined in this
                experiment by finding the concentration of <B /> at equilibrium
                where half the binding sites of <A /> are occupied.
            </>
        ),
        moreInfo: (
            <>
                K<sub>d</sub> = [<B />] (at equilibrium when 50% of <A /> is
                bound to <B />)
            </>
        ),
        callToAction: (
            <>
                Let’s find K<sub>d</sub> - Repeat the experiment by pausing,
                adjusting the concentration of <B /> and recording the
                equilibrium point until you have enough data.
            </>
        ),
        section: Section.Experiment,
        layout: LayoutType.SimulationWindow,
    },
    {
        content:
            "Congratulations, you’ve completed the High Affinity experiment!",
        backButton: true,
        nextButton: true,
        nextButtonText: "View examples",
        section: Section.BonusContent,
        layout: LayoutType.FullScreen,
    },
    {
        title: "Real-world example: Antibodies and antigens, high affinity binders",
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
        section: Section.BonusContent,
        layout: LayoutType.SimulationWindow,
        trajectoryUrl:
            "https://aics-simularium-data.s3.us-east-2.amazonaws.com/trajectory/binding-affinity_antibodies.simularium",
    },
    {
        title: "Real-world example: Affinity is determined by intermolecular forces",
        content: (
            <>
                A pair of molecules’ binding affinity is determined by{" "}
                <Definition term="intermolecular forces" />. The first Antibody
                has a lower binding affinity for the Antigen than the second
                Antibody. Why, do you think, is this the case?
            </>
        ),
        backButton: true,
        nextButton: true,
        nextButtonText: "Finish",
        visualContent: <FinalPage />,
        section: Section.BonusContent,
        layout: LayoutType.WideScreen,
    },
    {
        title: "",
        content: <>Next Up: Low affinity binding!</>,
        section: Section.BonusContent,
        layout: LayoutType.FullScreen,
    },
];

export const moduleNames = {
    [Module.A_B_AB]: "High Affinity",
    [Module.A_C_AC]: "Low Affinity",
    [Module.A_B_C_AB_AC]: "Competitive Binding",
};

export const PAGE_NUMBER_3D_EXAMPLE = {
    [Module.A_B_AB]: 12,
    [Module.A_C_AC]: 9,
    [Module.A_B_C_AB_AC]: 9,
};

export default {
    [Module.A_B_AB]: highAffinityContentArray,
} as { [key in Module]: ContentPanelProps[] };
