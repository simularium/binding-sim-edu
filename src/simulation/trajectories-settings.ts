import { ReactionType } from "../constants";
import { AvailableAgentNames, InputAgent, InputConcentration, ProductNames } from "../types";
import {
    AGENT_AB_COLOR,
    AGENT_A_COLOR,
    AGENT_B_COLOR,
    AGENT_C_COLOR,
} from "../constants/colors";

export const AGENT_AND_PRODUCT_COLORS = {
    [AvailableAgentNames.A]: AGENT_A_COLOR,
    [AvailableAgentNames.B]: AGENT_B_COLOR,
    [AvailableAgentNames.C]: AGENT_C_COLOR,
    [ProductNames.AB]: AGENT_AB_COLOR,
};

const agentA: InputAgent = {
    id: 0,
    name: AvailableAgentNames.A,
    concentration: 0,
    radius: 3,
    partners: [1, 2],
    color: AGENT_A_COLOR,
};
const agentB: InputAgent = {
    id: 1,
    name: AvailableAgentNames.B,
    concentration: 0,
    radius: 0.7,
    partners: [0],
    kOn: 0.6,
    kOff: 0.2,
    color: AGENT_B_COLOR,
};

const agentC: InputAgent = {
    id: 2,
    name: AvailableAgentNames.C,
    concentration: 0,
    radius: 1,
    partners: [0],
    kOn: 0.5,
    kOff: 0.8,
    color: AGENT_C_COLOR,
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

export const DEFAULT_TIME_FACTOR = 40;
export const DEFAULT_VIEWPORT_SIZE = { width: 500, height: 500 };
export const INITIAL_CONCENTRATIONS = { A: 10, B: 10, C: 10 };

export const getMaxConcentration = (reactionType: ReactionType): number => {
    switch (reactionType) {
        case ReactionType.A_B_AB:
            return 20;
        case ReactionType.A_C_AC:
            return 20; //TODO: adjust these as needed
        case ReactionType.A_B_C_AB_AC:
            return 20; //TODO: adjust these as needed
    }
};

export const getActiveAgents = (reactionType: ReactionType): AvailableAgentNames[] => {
    switch (reactionType) {
        case ReactionType.A_B_AB:
            return [AvailableAgentNames.A, AvailableAgentNames.B];
        case ReactionType.A_C_AC:
            return [AvailableAgentNames.A, AvailableAgentNames.C];
        case ReactionType.A_B_C_AB_AC:
            return [
                AvailableAgentNames.A,
                AvailableAgentNames.B,
                AvailableAgentNames.C,
            ];
    }
};

export const getInitialConcentrations = (activeAgents: AvailableAgentNames[]): InputConcentration => {
    return activeAgents.reduce((acc, agent) => {
        return { ...acc, [agent]: INITIAL_CONCENTRATIONS[agent] };
    }, {});
};
