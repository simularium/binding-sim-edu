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
        content: "Placeholder",
        section: Section.Experiment,
        layout: LayoutType.LiveSimulation,
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
