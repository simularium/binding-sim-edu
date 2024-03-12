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

export type ProgressionControlChildProps =
  | React.InputHTMLAttributes<HTMLInputElement>
  | React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ProgressionControlChild =
  React.ReactElement<ProgressionControlChildProps>;

export type ProgressionInputEvent = React.ChangeEvent<HTMLInputElement> &
  React.FormEvent<HTMLButtonElement>;

export type ProgressionMouseEvent = React.MouseEvent<HTMLButtonElement> &
  React.MouseEvent<HTMLInputElement>;