import { ScatterTrace } from "../types";

const NAMES: { [key: string]: string } = {
    Antigen: "Antigen",
    "Antibody#Bound": "Antibody-Antigen",
    "Antibody#Unbound": "Antibody",
};

class PlotData {
    private data: ScatterTrace[];
    public time: number;
    private timeFactor: number;

    constructor(plotData: ScatterTrace[], timeFactor: number = 2) {
        this.data = plotData;
        this.time = 0;
        this.timeFactor = timeFactor;
    }
    update(time: number) {
        this.time = time;
    }
    getCurrentConcentrations() {
        const init = <{ [key: string]: number }>{
            Antibody: 0,
            Antigen: 0,
            "Antibody-Antigen": 0,
        };
        const concentrations = this.data.reduce((acc, trace: ScatterTrace) => {
            const name = NAMES[trace.name];
            acc[name] = trace.y[this.time / this.timeFactor];
            return acc;
        }, init);
        return concentrations;
    }
}

export default PlotData;
