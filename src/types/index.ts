import {
    ChangeEvent,
    ChangeEventHandler,
    FormEvent,
    FormEventHandler,
    MouseEvent as ReactMouseEvent,
    MouseEventHandler,
} from "react";
import { ProgressionElement } from "../constants";

export const enum Module {
    A_B_AB = 1,
    A_C_AC = 2,
    A_B_D_AB = 3,
}

export enum Section {
    LandingPage = 0,
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

export enum AgentType {
    Fixed = "Fixed",
    Adjustable_1 = "Adjustable_1",
    Adjustable_2 = "Adjustable_2",
    Competitor = "Competitor",
    Complex_1 = "Complex_1",
    Complex_2 = "Complex_2",
    Complex_3 = "Complex_3",
}

export enum AgentName {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    Antibody = "Antibody",
    Antigen = "Antigen",
}

export enum ProductName {
    AB = "AB",
    AC = "AC",
    AD = "AD",
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
    complexColor?: string;
}

export interface PageContent {
    content: string | JSX.Element;
    section: Section;
    layout: LayoutType;
    visualContent?: JSX.Element;
    acknowledgment?: JSX.Element;
    title?: string;
    actionButton?: JSX.Element;
    callToAction?: string | JSX.Element;
    moreInfo?: string | JSX.Element;
    nextButton?: boolean;
    backButton?: boolean;
    nextButtonText?: string;
    trajectoryUrl?: string;
    progressionElement?: ProgressionElement;
    quizQuestion?: string;
    modal?: {
        title: string;
        content: string | JSX.Element;
    };
}

export enum UiElement {
    Concentration = "Concentration",
    ConcentrationBonus = "ConcentrationBonus",
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

export enum InitialCondition {
    RANDOM = "random",
    SORTED = "sorted",
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
