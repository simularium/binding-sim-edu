import React from "react";
import Slider from "./shared-components/Slider";

interface AdminUIProps {
    timeFactor: number;
    setTimeFactor: (value: number) => void;
}

const AdminUI: React.FC<AdminUIProps> = ({timeFactor, setTimeFactor}) => {

    return (
        <div>
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
    );
};

export default AdminUI;
