import { FormEventHandler } from "react";

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
}
export type ProgressionInputEvent = 
    React.ChangeEvent<HTMLInputElement> &
    React.FormEvent<HTMLButtonElement>;

export type ProgressionMouseEvent =
    | React.MouseEvent<HTMLButtonElement>
    | React.MouseEvent<HTMLInputElement>
    | React.MouseEvent<HTMLInputElement, MouseEvent>;

export type BaseHandler =
    | FormEventHandler<HTMLButtonElement>
    | React.MouseEventHandler<HTMLButtonElement>
    | React.ChangeEventHandler<HTMLInputElement>
    | ((
          event: unknown,
          optionalValue?: string | number | string[] | number[]
      ) => void); // case where we intercept the handler  
      
export type ProgressionControlEvent = React.FormEvent<HTMLButtonElement> & React.MouseEvent<HTMLButtonElement, MouseEvent> & React.ChangeEvent<HTMLInputElement>;
