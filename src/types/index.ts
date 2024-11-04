import {
    ChangeEvent,
    ChangeEventHandler,
    FormEvent,
    FormEventHandler,
    MouseEvent as ReactMouseEvent,
    MouseEventHandler,
} from "react";

export const enum Module {
    A_B_AB = 1,
    A_C_AC = 2,
    A_B_C_AB_AC = 3,
}

export enum Section {
    Introduction = 1,
    Experiment = 2,
    BonusContent = 3,
}

export const enum LayoutType {
    FullScreenOverlay = "full-screen",
    NoSidePanels = "no-side-panels",
    LiveSimulation = "live-simulation-window",
    PreComputedSimulation = "pre-computed-simulation",
}

export enum AgentFunction {
    Fixed = "Fixed",
    Adjustable = "Adjustable",
    Competitor = "Competitor",
    Complex = "Complex",
}

export enum AgentName {
    A = "A",
    B = "B",
    C = "C",
    Antibody = "Antibody",
    Antigen = "Antigen",
}

export enum ProductName {
    AB = "AB",
    AC = "AC",
    AntibodyAntigen = "Antibody-Antigen",
    Hemoglobin = "Hemoglobin",
}

export type StateNames = AgentName | ProductName;

export type InputConcentration = {
    [key in AgentName]?: number;
};

export type CurrentConcentration = {
    [key in StateNames]?: number;
};

export interface InputAgent {
    id: number;
    name: AgentName;
    initialConcentration: number;
    radius: number;
    partners: number[];
    kOn?: number;
    kOff?: number;
    count?: number;
    color: string;
}

export interface PageContent {
    content: string | JSX.Element;
    section: Section;
    layout: LayoutType;
    visualContent?: JSX.Element;
    title?: string;
    actionButton?: JSX.Element;
    callToAction?: string | JSX.Element;
    moreInfo?: string | JSX.Element;
    nextButton?: boolean;
    backButton?: boolean;
    nextButtonText?: string;
    trajectoryUrl?: string;
    modal?: {
        title: string;
        content: string | JSX.Element;
    };
}

export enum UiElement {
    Concentration = "Concentration",
    EventsOverTimePlot = "EventsOverTimePlot",
    ConcentrationOverTimePlot = "ConcentrationOverTimePlot",
    EquilibriumPlot = "EquilibriumPlot",
    ReactionDisplay = "ReactionDisplay",
}

export interface ScatterTrace {
    x: number[];
    y: number[];
    mode: "markers" | "lines" | "lines+markers";
    type: "scatter";
    name: string;
}

export interface StoredAgent extends InputAgent {
    count: number;
}

export type ProgressionInputEvent = ChangeEvent<HTMLInputElement> &
    FormEvent<HTMLButtonElement>;

export type ProgressionMouseEvent =
    | ReactMouseEvent<HTMLButtonElement>
    | ReactMouseEvent<HTMLInputElement>
    | ReactMouseEvent<HTMLInputElement, MouseEvent>;

export type BaseHandler =
    | FormEventHandler<HTMLButtonElement>
    | MouseEventHandler<HTMLButtonElement>
    | ChangeEventHandler<HTMLInputElement>
    | ((
          event: unknown,
          optionalValue?: string | number | string[] | number[]
      ) => undefined | boolean); // case where we intercept the handler

export type ProgressionControlEvent = FormEvent<HTMLButtonElement> &
    ReactMouseEvent<HTMLButtonElement, MouseEvent> &
    ChangeEvent<HTMLInputElement>;

export enum TrajectoryStatus {
    INITIAL,
    LOADING,
    LOADED,
    ERROR,
}
