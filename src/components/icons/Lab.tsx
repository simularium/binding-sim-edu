import React from "react";

const LabIcon: React.FC = () => {
    return (
        <svg
            className="custom-icon"
            width="10"
            viewBox="0 -10 40 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="Icon_cuvette">
                <g>
                    <g id="Back_face" data-name="Back face">
                        <line
                            x1="12.1"
                            y1="56.88"
                            x2="12.34"
                            y2="10.32"
                            fill="none"
                            opacity=".18"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M1.57,65.01l9.39-7.56c.72-.58,1.62-.8,2.48-.6l17.49,4.1"
                            fill="none"
                            opacity=".18"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </g>
                    <g id="solution">
                        <path
                            id="solution-2"
                            data-name="solution"
                            d="M20.99,44.3c2.73,1.87,10.3-2.24,10.1-8.72-.08,6.73-.16,25.38-.16,25.38l-9.94,9.16-19.43-5.11s-.45-17.63-.57-24.12c1.57,5.83,15.96,6.24,20,3.41Z"
                            fill="currentColor"
                            strokeWidth="0"
                            opacity={0.95}
                        />
                        <path
                            id="solution-3"
                            data-name="solution"
                            d="M1,40.89c1.57,5.83,15.96,6.24,20,3.41,2.73,1.87,10.3-2.24,10.1-8.72-4.58,5.23-15.93,1.84-18.45-2.03-.2-.31-.67-.28-.77.07-1.16,3.78-5.81,8.79-10.87,7.26Z"
                            fill="currentColor"
                            strokeWidth="0"
                            opacity={0.5}
                        />
                    </g>
                    <g id="Front_face" data-name="Front face">
                        <path
                            d="M1,8.36l.56,55.39c0,.75.47,1.39,1.13,1.56l16.91,4.45c.88.23,1.81,0,2.5-.65l8.02-7.39c.52-.48.82-1.18.82-1.93l.36-54.64"
                            fill="rgba(255, 255, 255, .13)"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                        />
                        <line
                            x1="20.99"
                            y1="70.12"
                            x2="20.98"
                            y2="12.03"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </g>
                    <g id="Top_face" data-name="Top face">
                        <line
                            x1="12.34"
                            y1="9.81"
                            x2="12.33"
                            y2="1.72"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M1.12,7.9L10.78,1.39c.5-.34,1.1-.46,1.68-.35l18.67,3.54c.17.03.21.27.07.38l-9.3,6.54c-.49.34-1.08.47-1.66.36L1.16,8.13c-.11-.02-.13-.18-.04-.24Z"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default LabIcon;
