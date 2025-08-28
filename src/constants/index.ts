export const MICRO = String.fromCharCode(956);
export const NANO = "n";
export const DEFAULT_VIEWPORT_SIZE = { width: 500, height: 500 };
export const LIVE_SIMULATION_NAME = "Binding Affinity Simulation";

export const VIEW_SWITCH_ID = "view-switch";
export const START_EXPERIMENT_ID = "start-experiment";
export const MIX_AGENTS_ID = "mix-agents";
export const PLAY_BUTTON_ID = "play-button";
export const RECORD_BUTTON_ID = "record-button";
export const CHANGE_CONCENTRATION_ID = "change-concentration-slider";

export const EQUILIBRIUM_QUIZ_ID = "equilibrium-quiz";
export const KD_QUIZ_ID = "kd-quiz";

export type ProgressionElement =
    | typeof VIEW_SWITCH_ID
    | typeof START_EXPERIMENT_ID
    | typeof MIX_AGENTS_ID
    | typeof PLAY_BUTTON_ID
    | typeof RECORD_BUTTON_ID
    | typeof CHANGE_CONCENTRATION_ID;
