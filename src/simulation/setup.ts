import {
    AgentName,
    InputAgent,
    InputConcentration,
    Module,
    ProductName,
} from "../types";
import {
    AGENT_AB_COLOR,
    AGENT_A_COLOR,
    AGENT_B_COLOR,
    AGENT_C_COLOR,
} from "../constants/colors";

export const AGENT_AND_PRODUCT_COLORS = {
    [AgentName.A]: AGENT_A_COLOR,
    [AgentName.B]: AGENT_B_COLOR,
    [AgentName.C]: AGENT_C_COLOR,
    [ProductName.AB]: AGENT_AB_COLOR,
};

const agentA: InputAgent = {
    id: 0,
    name: AgentName.A,
    initialConcentration: 0,
    radius: 3,
    partners: [1, 2],
    color: AGENT_A_COLOR,
};

const agentB: InputAgent = {
    id: 1,
    name: AgentName.B,
    initialConcentration: 0,
    radius: 0.7,
    partners: [0],
    kOn: 0.6,
    kOff: 0.2,
    color: AGENT_B_COLOR,
};

const agentC: InputAgent = {
    id: 2,
    name: AgentName.C,
    initialConcentration: 0,
    radius: 1,
    partners: [0],
    kOn: 0.5,
    kOff: 0.8,
    color: AGENT_C_COLOR,
};

export const AVAILABLE_AGENTS = {
    [AgentName.A]: agentA,
    [AgentName.B]: agentB,
    [AgentName.C]: agentC,
};

export const createAgentsFromConcentrations = (
    activeAgents: AgentName[],
    concentrations: { [key in AgentName]: number }
): InputAgent[] => {
    return activeAgents.map((agentName: AgentName) => {
        const agent = { ...AVAILABLE_AGENTS[agentName] };
        agent.initialConcentration = concentrations[agentName];
        return agent;
    });
};

export const DEFAULT_TIME_FACTOR = 85;
export const INITIAL_CONCENTRATIONS = { A: 10, B: 10, C: 10 };

export const getMaxConcentration = (reactionType: Module): number => {
    switch (reactionType) {
        case Module.A_B_AB:
            return 500;
        case Module.A_C_AC:
            return 20; //TODO: adjust these as needed
        case Module.A_B_C_AB_AC:
            return 20; //TODO: adjust these as needed
    }
};

export const getActiveAgents = (reactionType: Module): AgentName[] => {
    switch (reactionType) {
        case Module.A_B_AB:
            return [AgentName.A, AgentName.B];
        case Module.A_C_AC:
            return [AgentName.A, AgentName.C];
        case Module.A_B_C_AB_AC:
            return [AgentName.A, AgentName.B, AgentName.C];
    }
};

export const getInitialConcentrations = (
    activeAgents: AgentName[]
): InputConcentration => {
    return activeAgents.reduce((acc, agent) => {
        return { ...acc, [agent]: INITIAL_CONCENTRATIONS[agent] };
    }, {});
};
