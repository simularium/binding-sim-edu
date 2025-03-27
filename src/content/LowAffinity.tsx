import { A, B, C } from "../components/agent-symbols";
import { LayoutType, PageContent, Section } from "../types";

export const lowAffinityContentArray: PageContent[] = [
    // making the content array 1 indexed to match the page numbers
    {
        content: "",
        section: Section.Introduction,
        layout: LayoutType.FullScreenOverlay,
    },
    {
        title: "Experiment with a binding partner",
        content: (
            <>
                Molecule <C /> has a different binding affinity with molecule{" "}
                <A />. Let’s repeat our simulation experiments with <A /> and{" "}
                <C /> to determine the binding affinity K<sub>d</sub> for this
                pair of molecules.
            </>
        ),
        layout: LayoutType.LiveSimulation,
        section: Section.Experiment,
        callToAction:
            "Press play and watch the Concentration over time plot until you think the reaction has reached equilibrium. Then, press the “Record” button to record the equilibrium concentration.",
    },
    {
        title: "Determining Kd",
        content: (
            <>
                We can use the same method we used for <A /> and <B /> to
                calculate the binding affinity (K<sub>d</sub>) for <A /> and{" "}
                <C />.
            </>
        ),
        layout: LayoutType.LiveSimulation,
        section: Section.Experiment,
        moreInfo: (
            <>
                K<sub>d</sub> = [<C />] (at equilibrium when 50% of <A /> is
                bound to <C />)
            </>
        ),
        callToAction: (
            <>
                Let’s find K<sub>d</sub> - Repeat the experiment by pausing,
                adjusting the concentration of <C /> and recording the
                equilibrium point until you have enough data.
            </>
        ),
    },
    {
        content:
            "Congratulations, you’ve completed the High Affinity experiment!",
        backButton: true,
        // nextButton: true,
        nextButtonText: "View examples",
        section: Section.BonusContent,
        layout: LayoutType.FullScreenOverlay,
    },
];
