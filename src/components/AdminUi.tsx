import React, { useEffect } from "react";

import Slider from "./shared/Slider";
import { BG_DARK, LIGHT_GREY } from "../constants/colors";

interface AdminUIProps {
    timeFactor: number;
    setTimeFactor: (value: number) => void;
}

const AdminUI: React.FC<AdminUIProps> = ({ timeFactor, setTimeFactor }) => {
    const [visible, setVisible] = React.useState<boolean>(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // control-option-1 (mac) or ctrl-alt-1 (windows)
            if (event.code === "Digit1" && event.altKey && event.ctrlKey) {
                setVisible(!visible);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [visible]);

    return (
        visible && (
            <div style={{position: "absolute", bottom: 0, background: LIGHT_GREY, color: BG_DARK}}>
                <h1>AdminUI</h1>
                <Slider
                    min={0}
                    max={100}
                    initialValue={timeFactor}
                    onChange={(_, value) => {
                        setTimeFactor(value);
                    }}
                    disabled={false}
                    name="time factor (ns)"
                />
            </div>
        )
    );
};

export default AdminUI;
