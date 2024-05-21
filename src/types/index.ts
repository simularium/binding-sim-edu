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

export enum AgentName {
    A = "A",
    B = "B",
    C = "C",
}

export enum ProductName {
    AB = "AB",
    AC = "AC",
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
