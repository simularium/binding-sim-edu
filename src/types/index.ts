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

export interface InputAgent {
    id: number;
    concentration: number;
    radius: number;
    partners: number[];
    kOn?: number;
    kOff?: number;
    count?: number;
    color: string;
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
