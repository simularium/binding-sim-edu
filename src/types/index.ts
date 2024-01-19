export enum AvailableAgentNames {
    A = "A",
    B = "B",
    C = "C",
}

export interface InputAgent {
    id: number;
    concentration: number;
    radius: number;
    partners: number[];
    kOn?: number;
    kOff?: number;
    count?: number;
}
