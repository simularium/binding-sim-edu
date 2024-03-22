import React, { useState } from "react";
import QuizForm from "./QuizForm";
import VisibilityControl from "./VisibilityControl";

const KdQuestion: React.FC = () => {
    const [selectedAnswer, setSelectedAnswer] = useState("");

    const handleSubmit = () => {
        console.log("KdQuestion handleSubmit");
    };

    const formContent = (
        <>
            <p>
                Referencing the Equilibrium Concentration plot, what is the
                binding affinity?
            </p>
            <p>Kd = ?</p>
            <input
                type="text"
                value={selectedAnswer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
            />
        </>
    );
    // TODO: this should only be shown at 4, but need to merge other changes before we can
    // get to page 4
    return (
        <VisibilityControl includedPages={[8]}>
            <QuizForm
                title="You reached the point where half of the binding sites of A are occupied."
                formContent={formContent}
                onSubmit={handleSubmit}
            />
        </VisibilityControl>
    );
};

export default KdQuestion;
