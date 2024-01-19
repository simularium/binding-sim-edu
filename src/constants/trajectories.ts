import { AvailableAgentNames, InputAgent } from "../types";

const agentA = {
    id: 0,
    concentration: 10,
    radius: 3,
    partners: [1, 2],
};
const agentB = {
    id: 1,
    concentration: 10,
    radius: 0.7,
    partners: [0],
    kOn: 0.1,
    kOff: 0.5,
};

const agentC = {
    id: 2,
    concentration: 10,
    radius: 1,
    partners: [0],
    kOn: 0.1,
    kOff: 0.5,
};

export const AVAILABLE_AGENTS = {
    [AvailableAgentNames.A]: agentA,
    [AvailableAgentNames.B]: agentB,
    [AvailableAgentNames.C]: agentC,
};

const trajectory1 = ["A", "B"];
const trajectory2 = ["A", "B"];
const trajectory3 = ["A", "B", "C"];
export const trajectories: { [key: number]: string[] } = {
    0: trajectory1,
    1: trajectory2,
    2: trajectory3,
};

export const createAgentsFromConcentrations = (
    activeAgents: AvailableAgentNames[],
    concentrations: { [key in AvailableAgentNames]: number }
): InputAgent[] => {
    return activeAgents.map((agentName: AvailableAgentNames) => {
        const agent = AVAILABLE_AGENTS[agentName];
        agent.concentration = concentrations[agentName];
        return agent;
    });
};
