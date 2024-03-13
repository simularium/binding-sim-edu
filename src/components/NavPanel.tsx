import React, { useState } from 'react';

interface NavPanelProps {
    steps: string[];
}

const NavPanel: React.FC<NavPanelProps> = ({ steps }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const handleStepChange = (stepIndex: number) => {
        setCurrentStep(stepIndex);
    };

    return (
        <div>
            <ul>
                {steps.map((step, index) => (
                    <li
                        key={index}
                        onClick={() => handleStepChange(index)}
                        style={{ fontWeight: currentStep === index ? 'bold' : 'normal' }}
                    >
                        {step}
                    </li>
                ))}
            </ul>
            <p>Current Step: {steps[currentStep]}</p>
        </div>
    );
};

export default NavPanel;