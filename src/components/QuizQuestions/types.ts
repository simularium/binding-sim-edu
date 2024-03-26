export enum FormState {
    Correct = "Correct",
    Incorrect = "Incorrect",
    Clear = "Clear",
}

export interface FeedbackProps {
    title?: string;
    message?: string;
}