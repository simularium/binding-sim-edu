import {
    ChangeEvent,
    ChangeEventHandler,
    FormEvent,
    FormEventHandler,
    MouseEvent as ReactMouseEvent,
    MouseEventHandler,
} from "react";

export enum AvailableAgentNames {
    A = "A",
    B = "B",
    C = "C",
}

export enum ProductNames {
    AB = "AB",
    AC = "AC",
}

export type StateNames = AvailableAgentNames | ProductNames;

export type InputConcentration = {
    [key in AvailableAgentNames]?: number;
};

export type CurrentConcentration = {
    [key in StateNames]?: number;
};

export interface InputAgent {
    id: number;
    name: AvailableAgentNames;
    concentration: number;
    radius: number;
    partners: number[];
    kOn?: number;
    kOff?: number;
    count?: number;
    color: string;
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
