import { ScatterTrace } from "../types";

const NAMES: { [key: string]: string } = {
    Antigen: "Antigen",
    "Antibody#Bound": "Antibody-Antigen",
    "Antibody#Unbound": "Antibody",
};

class PlotData {
    private data: ScatterTrace[];
    private time: number;

    constructor(plotData: ScatterTrace[]) {
        this.data = plotData;
        this.time = 0;
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
            acc[name] = trace.y[this.time / 2];
            return acc;
        }, init);
        return concentrations;
    }
}

export default PlotData;
