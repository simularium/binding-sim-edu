import { A, AB, AD, B, D } from "../components/agent-symbols";
import StartExperiment from "../components/StartExperiment";
import {
    PLAY_BUTTON_ID,
    RECORD_BUTTON_ID,
    START_EXPERIMENT_ID,
} from "../constants";
import { LayoutType, PageContent, Section } from "../types";

export const competitiveArray: PageContent[] = [
    // making the content array 1 indexed to match the page numbers
    {
        title: "Competitive Binding",
        content: (
            <>
                <p>
                    We now know how to find the binding affinity of a ligand for
                    a binding partner. In the Competitive Binding module, we
                    have developed a competitive inhibitor that binds in the
                    same manner as our ligand and we want to figure out how well
                    it blocks the binding.
                </p>
                <p>
                    In this scenario we cannot directly measure the formation of
                    the complex with the inhibitor, so we have to measure how
                    much the addition of the inhibitor reduces the signal from
                    our original complex.
                </p>
            </>
        ),
        acknowledgment: (
            <>
                <div>
                    David S. Goodsell, RCSB Protein Data Bank and Springer
                    Nature; doi: 10.2210/rcsb_pdb/goodsell-gallery-025
                </div>
                <div>
                    This painting shows a cross section through SARS-CoV-2
                    surrounded by blood plasma, with neutralizing antibodies in
                    bright yellow. The painting was commissioned for the cover
                    of a special COVID-19 issue of Nature, presented 20 August
                    2020, and is currently in the collection of the Cultural
                    Programs of the National Academy of Sciences.
                </div>
            </>
        ),
        section: Section.LandingPage,
        layout: LayoutType.FullScreenOverlay,
    },
    {
        title: "Competitive Binding",
        content: (
            <>
                In the "High Affinity" section we determined the binding
                affinity of <A /> and <B />. Our new competitive inhibitor,{" "}
                <D />, also binds to <A />. Once it binds to <A />, <B /> can no
                longer bind.
            </>
        ),
        layout: LayoutType.LiveSimulation,
        section: Section.Introduction,
        progressionElement: PLAY_BUTTON_ID,
        callToAction:
            "Press play and watch the how the two different complexes form over time.",
    },
    {
        title: "Start the experiment",
        content: (
            <>
                We cannot directly measure the formation of <AD /> (which is why
                it's shown in grey). To figure out how strongly <B /> binds to{" "}
                <A /> we're going to keep track of how adding more <D />{" "}
                decreases the formation of <AB />.
            </>
        ),
        layout: LayoutType.LiveSimulation,
        section: Section.Introduction,
        actionButton: <StartExperiment />,
        progressionElement: START_EXPERIMENT_ID,
        callToAction: (
            <>
                Click the <strong>Start experiment</strong> button to reset the
                simulation and begin by pressing <strong>play</strong>!
            </>
        ),
    },
    {
        title: "Start the experiment",
        content: (
            <>
                We cannot directly measure the formation of <AD /> (which is why
                it's shown in grey). To figure out how strongly <B /> binds to{" "}
                <A /> we're going to keep track of how adding more <D /> affects
                the amount of <AB /> formed.
            </>
        ),
        layout: LayoutType.LiveSimulation,
        section: Section.Introduction,
        actionButton: <StartExperiment />,
        progressionElement: PLAY_BUTTON_ID,
        callToAction: (
            <>
                Click the <strong>Start experiment</strong> button to reset the
                simulation and begin by pressing <strong>play</strong>!
            </>
        ),
    },

    {
        title: "Find maximum complex formation",
        content: (
            <>
                We are starting with [<D />] = 0, so the <AB /> complex is able
                to form without any inhibition. This will be our baseline for
                the max amount of <AB /> that can form at these concentrations.{" "}
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
        title: "Introduce the competitive inhibitor",
        content: (
            <>
                Now let's see how the addition of <D /> affects the formation of{" "}
                <AB />.
            </>
        ),
        callToAction: (
            <>
                If you haven’t already done so, <strong>pause</strong> the
                simulation and use the now-visible interactive slider under{" "}
                <strong>Agent concentrations</strong> to adjust the
                concentration of <D /> and <strong>play</strong> the simulation
                again.
            </>
        ),
        section: Section.Experiment,
        layout: LayoutType.LiveSimulation,
        progressionElement: PLAY_BUTTON_ID,
    },
    {
        title: "Repeating the experiment",
        content: (
            <>
                We want to understand the affect <D /> has on the formation of{" "}
                <AB />. Let’s repeat the experiment with a new concentration of{" "}
                <D />. We will keep the concentration of <A /> and <B />{" "}
                constant.
            </>
        ),
        callToAction: (
            <>
                For each new concentration of <D />, determine when equilibrium
                has been reached and then press the <strong>Record</strong>{" "}
                button to plot their equilibrium concentrations.
            </>
        ),
        section: Section.Experiment,
        layout: LayoutType.LiveSimulation,
        progressionElement: RECORD_BUTTON_ID,
    },
    {
        title: "Deriving Ki",
        content: (
            <>
                The constant K<sub>i</sub> is analogous to K<sub>d</sub> for
                inhibitors. K<sub>i</sub> can be determined in this experiment
                by finding the IC<sub>50</sub>, the concentration of inhibitor
                where the amount of <AB /> complex is reduced by half.
            </>
        ),
        moreInfo: (
            <>
                K<sub>50</sub> = [<D />] (at equilibrium when [<AB />] is half
                of max)
            </>
        ),
        callToAction: (
            <>
                Let’s find K<sub>50</sub> - Repeat the experiment by pausing,
                adjusting the concentration of <D /> and recording the
                equilibrium point until you have enough data.
            </>
        ),
        section: Section.Experiment,
        layout: LayoutType.LiveSimulation,
    },
    {
        content:
            "Congratulations, you’ve completed the Competitive Binding experiment!",
        backButton: true,
        // nextButton: true,
        nextButtonText: "View examples",
        section: Section.BonusContent,
        layout: LayoutType.FullScreenOverlay,
    },
];
