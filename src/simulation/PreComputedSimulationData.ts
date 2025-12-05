import {
    AgentType,
    AgentName,
    CurrentConcentration,
    InputAgent,
    Module,
    ProductName,
} from "../types";
import ISimulationData, {
    AGENT_AND_PRODUCT_COLORS,
    TrajectoryType,
} from "./ISimulationData";
import { MICRO } from "../constants";

export default class PreComputedSimulationData implements ISimulationData {
    static NAME_TO_FUNCTION_MAP = {
        [AgentName.Antibody]: AgentType.Fixed,
        [AgentName.Antigen]: AgentType.Adjustable_1,
        [ProductName.AntibodyAntigen]: AgentType.Complex_1,
    };
    static EXAMPLE_TRAJECTORY_URLS = {
        [Module.A_B_AB]:
            "https://aics-simularium-data.s3.us-east-2.amazonaws.com/trajectory/binding-affinity_antibodies.simularium",
        [Module.A_C_AC]:
            "https://aics-simularium-data.s3.us-east-2.amazonaws.com/trajectory/binding-affinity_hemoglobin.simularium",
        [Module.A_B_D_AB]:
            "https://aics-simularium-data.s3.us-east-2.amazonaws.com/trajectory/binding-affinity_hemoglobin-co.simularium",
    };

    timeUnit = MICRO;

    PRODUCT = {
        [Module.A_B_AB]: ProductName.AntibodyAntigen,
        [Module.A_C_AC]: ProductName.Hemoglobin,
        [Module.A_B_D_AB]: ProductName.Hemoglobin,
    };
    type = TrajectoryType.precomputed;

    getCurrentProduct = (module: Module): ProductName => {
        return this.PRODUCT[module];
    };

    getMaxConcentration = (module: Module): number => {
        let maxConcentration = 0;
        switch (module) {
            case Module.A_B_AB:
                maxConcentration = 500;
                break;
            case Module.A_C_AC:
                maxConcentration = 20;
                break;
            case Module.A_B_D_AB:
                maxConcentration = 20;
                break;
        }
        return maxConcentration;
    };

    getAgentType = (name: AgentName | ProductName): AgentType => {
        return (
            PreComputedSimulationData.NAME_TO_FUNCTION_MAP as Record<
                AgentName | ProductName,
                AgentType
            >
        )[name];
    };

    getAgentColor = (name: AgentName | ProductName): string => {
        const agentFunction = this.getAgentType(name);
        return AGENT_AND_PRODUCT_COLORS[agentFunction];
    };

    getActiveAgents = () => {
        return [];
    };

    getInitialConcentrations = (): CurrentConcentration => {
        return {};
    };

    createAgentsFromConcentrations = (): InputAgent[] | null => {
        return null;
    };
    getKd = (): number => {
        return 0;
    };
}
