export enum FormState {
    Correct = "Correct",
    Incorrect = "Incorrect",
    Clear = "Clear",
    Finished = "Finished",
}

export interface FeedbackProps {
    title?: string;
    message?: string;
    resetForm?: () => void;
}
