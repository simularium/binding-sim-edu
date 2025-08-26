import BindingDiagrams from "../components/BindingDiagrams";
import MixButton from "../components/MixButton";
import StartExperiment from "../components/StartExperiment";
import { AB, A, B } from "../components/agent-symbols";
import KdDerivation from "../components/modals/KdDerivation";
import Definition from "../components/shared/Definition";
import {
    CHANGE_CONCENTRATION_ID,
    EQUILIBRIUM_QUIZ_ID,
    MIX_AGENTS_ID,
    PLAY_BUTTON_ID,
    RECORD_BUTTON_ID,
    START_EXPERIMENT_ID,
    VIEW_SWITCH_ID,
} from "../constants";
import { PageContent, Section, LayoutType } from "../types";

export const highAffinityContentArray: PageContent[] = [
    {
        title: "Binding Affinity",
        content: (
            <>
                <p>
                    Welcome to the Binding Affinity interactive application!
                    Here, you will learn how to determine the strength of
                    interaction between two molecules in the lab by using
                    computer simulations.{" "}
                </p>
                <p>
                    This educational module is designed to be completed in a
                    linear sequence, starting with high affinity, which contains
                    important introductory content and guidance. However, if you
                    complete the proceeding module, you may use the navigation
                    at the top of the page to “drop in” on the next section.
                </p>
            </>
        ),
        section: Section.LandingPage,
        layout: LayoutType.FullScreenOverlay,
        acknowledgment: (
            <>
                <div>
                    David S. Goodsell, RCSB Protein Data Bank.
                    doi:10.2210/rcsb_pdb/goodsell-gallery-021
                </div>
                <div>
                    This painting is part of “VAX”, a series of paintings
                    exploring the molecular basis of vaccines. These paintings
                    are designed to be accurate representations of the
                    biological processes, but they also serve as a personal
                    celebration of a miracle of modern medicine. The painting
                    shows aggregation of poliovirus by antibodies in a
                    vaccinated person, neutralizing the virus and preventing
                    infection.
                </div>
            </>
        ),
    },
    {
        content:
            "Congratulations! You’ve just joined a biology lab. Your mentor has asked you to measure the strength of the binding interaction between two types of molecules. These molecules are too small to see, even under a microscope. But what if we could somehow see what the molecules in the tube are doing? What do you think you’d see?",
        callToAction:
            "Click or tap the animated button to switch your view to a molecular simulation.",
        section: Section.Introduction,
        layout: LayoutType.LiveSimulation,
        progressionElement: VIEW_SWITCH_ID,
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
        callToAction: (
            <>
                What happens to the molecules once you press{" "}
                <strong>play</strong>?
            </>
        ),
        section: Section.Introduction,
        layout: LayoutType.LiveSimulation,
        progressionElement: PLAY_BUTTON_ID,
    },
    {
        content: (
            <>
                As the simulation plays, the molecules move by a random walk.
                Watch what happens when they bump into each other. What do you
                think the <strong>Reaction events over time</strong> graph is
                showing?
            </>
        ),
        callToAction: (
            <>
                After you've observed the simulation, click{" "}
                <strong>Lab view</strong> to see what the cuvette looks like
                now.
            </>
        ),
        section: Section.Introduction,
        layout: LayoutType.LiveSimulation,
        progressionElement: VIEW_SWITCH_ID,
    },
    {
        content: (
            <>
                The clear liquid is slowly turning yellow as the simulation
                progresses, but it is taking a long time to change. Can you
                estimate the concentration of <AB /> ?
            </>
        ),
        callToAction: (
            <>
                Click <strong>Molecular view</strong> to switch back.
            </>
        ),
        section: Section.Introduction,
        layout: LayoutType.LiveSimulation,
        progressionElement: VIEW_SWITCH_ID,
    },
    {
        content: (
            <>
                The two populations started on opposite sides of the window, so
                they have to diffuse before they can bind, which takes awhile.
                Let's randomize their positions so we are only looking at the
                binding events.
            </>
        ),
        callToAction: (
            <>
                Click the <strong>Randomize positions</strong> button, press{" "}
                <strong>play</strong> again!
            </>
        ),
        actionButton: <MixButton />,
        section: Section.Introduction,
        layout: LayoutType.LiveSimulation,
        progressionElement: MIX_AGENTS_ID,
    },
    {
        content: (
            <>
                The two populations started on opposite sides of the window, so
                they have to diffuse before they can bind, which takes awhile.
                Let's randomize their positions so we are only looking at the
                binding events.
            </>
        ),
        callToAction: (
            <>
                Click the <strong>Randomize positions</strong> button, press{" "}
                <strong>play</strong> again!
            </>
        ),
        actionButton: <MixButton />,
        section: Section.Introduction,
        layout: LayoutType.LiveSimulation,
        progressionElement: PLAY_BUTTON_ID,
    },
    {
        content: (
            <>Randomizing the positions is simulating a well mixed solution.</>
        ),
        callToAction: (
            <>
                Click <strong>Lab view</strong> to see what the cuvette looks
                like now.
            </>
        ),

        section: Section.Introduction,
        layout: LayoutType.LiveSimulation,
        progressionElement: VIEW_SWITCH_ID,
    },
    {
        content: (
            <>
                There are now many more bound complexes in the "solution", so
                our measured indicator (in this case, color) is now much
                stronger for roughly the same amount of time.
            </>
        ),
        callToAction: (
            <>
                Click <strong>Molecular view</strong> to switch back to the
                simulation.
            </>
        ),

        section: Section.Introduction,
        layout: LayoutType.LiveSimulation,
        progressionElement: VIEW_SWITCH_ID,
    },
    {
        title: "Start the experiment",
        content: (
            <>
                Now, let's use this simulation to make measurements. We're going
                to start with randomized positions and increase the timestep so
                the experiments are fast.
            </>
        ),
        actionButton: <StartExperiment />,
        callToAction: (
            <>
                Click the <strong>Start experiment</strong> button to reset the
                simulation and begin by pressing <strong>play</strong>!
            </>
        ),
        section: Section.Introduction,
        layout: LayoutType.LiveSimulation,
        progressionElement: START_EXPERIMENT_ID,
    },
    {
        title: "Start the experiment",
        content: (
            <>
                Now, let's use this simulation to make measurements. We're going
                to start with randomized positions and increase the timestep so
                the experiments are fast.
            </>
        ),
        actionButton: <StartExperiment />,
        callToAction: (
            <>
                Click the <strong>Start experiment</strong> button to reset the
                simulation and begin by pressing <strong>play</strong>!
            </>
        ),
        section: Section.Experiment,
        layout: LayoutType.LiveSimulation,
        progressionElement: PLAY_BUTTON_ID,
    },
    {
        title: "Identifying equilibrium",
        content: (
            <>
                When the reaction first starts, the concentration of each
                molecule changes rapidly as the two molecules, <A /> and <B />,
                bind to form <AB />. Eventually, the reaction reaches{" "}
                <Definition term="equilibrium" />, at which point the
                concentration of <AB /> stays more or less consistent.
            </>
        ),
        callToAction: (
            <>
                Watch the <strong>Concentration over time</strong> plot until
                you think the reaction has reached equilibrium. Then, press the{" "}
                <strong>Record</strong> button to record the equilibrium
                concentration.
            </>
        ),
        section: Section.Experiment,
        layout: LayoutType.LiveSimulation,
        progressionElement: RECORD_BUTTON_ID,
    },
    {
        title: "Affinity",
        content: (
            <>
                The goal of these experiments is to figure out how tightly two
                molecules bind, or stick to each other. We call this{" "}
                <Definition term={"affinity"} />.
            </>
        ),
        callToAction: (
            <>
                If you haven’t already done so, <strong>pause</strong> the
                simulation and use the now-visible interactive slider under{" "}
                <strong>Agent concentrations</strong> to adjust the
                concentration of <B /> and <strong>play</strong> the simulation
                again.
            </>
        ),
        section: Section.Experiment,
        layout: LayoutType.LiveSimulation,
        progressionElement: CHANGE_CONCENTRATION_ID,
        quizQuestion: EQUILIBRIUM_QUIZ_ID,
    },
    {
        title: "Repeating the experiment",
        content: (
            <>
                We want to understand the affinity of{" "}
                <Definition term="enzyme" /> <A /> and{" "}
                <Definition term="substrate" /> <B /> regardless of the
                concentration of substrate. Let’s repeat the experiment with a
                new concentration of <B />. We will keep the concentration of{" "}
                <A /> constant to avoid introducing more than one{" "}
                <Definition term="variable" /> at a time.
            </>
        ),
        callToAction: (
            <>
                For each new concentration of <B />, determine when equilibrium
                has been reached and then press the <strong>Record</strong>{" "}
                button to plot their equilibrium concentrations.
            </>
        ),
        section: Section.Experiment,
        layout: LayoutType.LiveSimulation,
        progressionElement: RECORD_BUTTON_ID,
    },
    {
        title: "Deriving Kd",
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
                to compare affinities. K<sub>d</sub> can be determined in this
                experiment by finding the concentration of <B /> at equilibrium
                where half the binding sites of <A /> are occupied.
            </>
        ),
        modal: {
            title: "Learn how to derive Kd",
            content: <KdDerivation />,
        },
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
        layout: LayoutType.LiveSimulation,
    },
    {
        content:
            "Congratulations, you’ve completed the High Affinity experiment!",
        backButton: true,
        nextButton: true,
        nextButtonText: "View examples",
        section: Section.BonusContent,
        layout: LayoutType.FullScreenOverlay,
    },
    {
        title: "Real-world example: Antibodies and antigens, high affinity binders",
        content: (
            <>
                The molecules you experimented with had a high affinity -
                similar to an <Definition term="antibody" /> and an{" "}
                <Definition term="antigen" /> it recognizes. Even if the antigen
                is present at low concentrations, the antibody stays tightly
                bound for a long time. This increases the total number of
                complexes at any given time and alerts the immune system of the
                antigen’s presence.
            </>
        ),
        nextButton: true,
        section: Section.BonusContent,
        layout: LayoutType.PreComputedSimulation,
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
        visualContent: <BindingDiagrams />,
        section: Section.BonusContent,
        layout: LayoutType.NoSidePanels,
    },
];
