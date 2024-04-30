import React from "react";

interface CuvetteProps {
    color: string;
}

const Cuvette: React.FC<CuvetteProps> = ({ color }) => {
    return (
        <svg
            width="133"
            height="229"
            viewBox="0 0 133 229"
            fill="none"
            style={{
                color: color,
            }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M55.4316 24.1213V173.996"
                stroke="#4B4B4B"
                strokeWidth="5"
            />
            <path
                d="M56.5327 71.6875L23.2266 91.0002V195.5L54.2266 174.5L102.227 182L102.876 79.5002L56.5327 71.6875Z"
                fill="currentColor"
                fillOpacity="0.85"
            />
            <path
                d="M57.5792 173.875L22.3477 195.045L70.3907 204.235L106.557 182.245L57.5792 173.875Z"
                fill="currentColor"
            />
            <path
                d="M56.9845 71.5071L56.8017 71.4759L56.6427 71.5714L23.7425 91.3405L22.6081 92.0222L23.9098 92.2609L70.4782 100.802L70.6718 100.837L70.8377 100.731L102.907 80.237L103.996 79.5407L102.721 79.3228L56.9845 71.5071Z"
                fill="currentColor"
                stroke="currentColor"
            />
            <path
                d="M55.4586 21.5308L54.4863 21.3767L53.67 21.9268L30.6048 37.4704L25.4387 40.9519L31.5784 42.0075L70.8254 48.7551L71.854 48.9319L72.703 48.3249L95.2851 32.1788L100.247 28.631L94.2225 27.676L55.4586 21.5308Z"
                stroke="#4B4B4B"
                strokeWidth="5"
            />
            <path
                d="M55.6988 176.366L54.7266 176.211L53.9102 176.762L30.8451 192.305L25.6789 195.787L31.8186 196.842L71.0656 203.59L72.0942 203.767L72.9433 203.16L95.5254 187.014L100.487 183.466L94.4628 182.511L55.6988 176.366Z"
                stroke="#4B4B4B"
                strokeWidth="5"
            />
            <path
                d="M71.4863 46.4102V201.003"
                stroke="#4B4B4B"
                strokeWidth="5"
            />
            <path
                d="M103.973 27.0439V181.757"
                stroke="#4B4B4B"
                strokeWidth="5"
            />
            <path d="M22 42.0752L22 197.029" stroke="#4B4B4B" strokeWidth="5" />
        </svg>
    );
};

export default Cuvette;
