import {
    AgentFunction,
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
        [AgentName.Antibody]: AgentFunction.Fixed,
        [AgentName.Antigen]: AgentFunction.Adjustable,
        [ProductName.AntibodyAntigen]: AgentFunction.Complex,
    };
    static EXAMPLE_TRAJECTORY_URLS = {
        [Module.A_B_AB]:
            "https://aics-simularium-data.s3.us-east-2.amazonaws.com/trajectory/binding-affinity_antibodies.simularium",
        [Module.A_C_AC]:
            "https://aics-simularium-data.s3.us-east-2.amazonaws.com/trajectory/binding-affinity_hemoglobin.simularium",
        [Module.A_B_C_AB_AC]:
            "https://aics-simularium-data.s3.us-east-2.amazonaws.com/trajectory/binding-affinity_hemoglobin-co.simularium",
    };

    timeUnit = MICRO;

    PRODUCT = {
        [Module.A_B_AB]: ProductName.AntibodyAntigen,
        [Module.A_C_AC]: ProductName.Hemoglobin,
        [Module.A_B_C_AB_AC]: ProductName.Hemoglobin,
    };

    getType = (): TrajectoryType => {
        return TrajectoryType.precomputed;
    };

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
            case Module.A_B_C_AB_AC:
                maxConcentration = 20;
                break;
        }
        return maxConcentration;
    };

    getAgentFunction = (name: AgentName | ProductName): AgentFunction => {
        return (
            PreComputedSimulationData.NAME_TO_FUNCTION_MAP as Record<
                AgentName | ProductName,
                AgentFunction
            >
        )[name];
    };

    getAgentColor = (name: AgentName | ProductName): string => {
        const agentFunction = this.getAgentFunction(name);
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
}
