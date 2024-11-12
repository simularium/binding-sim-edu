import { UiElement } from "../types";

const infoText = {
    [UiElement.Concentration]:
        "When the simulation is running, this shows the live concentration of each agent. The white arrow indicates the starting concentration of the reactants. When the simulation is paused, the variable agent can be adjusted to a new concentration.",
    [UiElement.ConcentrationBonus]:
        "When the trajectory is playing, this shows the live concentration of each agent.",
    [UiElement.EventsOverTimePlot]:
        "In the lab it is impossible to count each reaction event between individual molecules because the molecules are so small and the reactions happen so fast. Instead, scientists measure populations of molecules with a proxy readout, like a color change. But with a simulation, we can track each reaction event and plot them here.",
    [UiElement.ConcentrationOverTimePlot]:
        "In this simulation, we can track the amount of complex produced over time. The x-axis is time, and the y-axis is the concentration of the complex formed for each starting concentration of the variable agent.",
    [UiElement.EquilibriumPlot]:
        "To find the affinity of two molecules, we need the concentration of the complex at equilibrium for different concentrations of reactants, which gives us a trend line. Each time you click the 'Record' button, a dot will appear showing the concentration of the complex verses the concentration of the adjustable agent at equilibrium.",
    [UiElement.ReactionDisplay]:
        "When molecules randomly collide, they sometimes undergo a reversible reaction where they bind together to form a complex, which is shown by the forward arrow. The complex can then fall apart (dissociate) back into the original molecules, shown by the reverse arrow.",
};

export default infoText;
