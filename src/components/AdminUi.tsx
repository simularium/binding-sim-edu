import React, { useContext, useEffect } from "react";

import Slider from "./shared/Slider";
import { BG_DARK, LIGHT_GREY } from "../constants/colors";
import { SimulariumContext } from "../simulation/context";
import { InputNumber, SliderSingleProps } from "antd";
import { zStacking } from "../constants/z-stacking";
import { Module } from "../types";

interface AdminUIProps {
    totalPages: number;
    timeFactor: number;
    setTimeFactor: (value: number) => void;
}

const AdminUI: React.FC<AdminUIProps> = ({
    timeFactor,
    setTimeFactor,
    totalPages,
}) => {
    const { page, setPage, module, setModule } = useContext(SimulariumContext);
    const isDev = process.env.NODE_ENV === "development";
    const [visible, setVisible] = React.useState<boolean>(isDev);
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
    const pageMarks: SliderSingleProps["marks"] = {};
    for (let i = 0; i <= totalPages; i++) {
        pageMarks[i] = { label: i.toString() };
    }
    const moduleMarks: SliderSingleProps["marks"] = {};
    const totalNumberOfModules = 2; // only 2 modules that work currently
    for (let i = 0; i <= totalNumberOfModules; i++) {
        moduleMarks[i] = { label: i.toString() };
    }
    return (
        visible && (
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    background: LIGHT_GREY,
                    color: BG_DARK,
                    width: "25%",
                    zIndex: zStacking.top,
                }}
            >
                <h1>AdminUI</h1>
                <div style={{ padding: 12 }}>
                    <h4>Page number</h4>
                    <Slider
                        min={0}
                        max={totalPages}
                        step={1}
                        overrideValue={page}
                        initialValue={page}
                        onChange={(_, value): void => {
                            setPage(value);
                        }}
                        marks={pageMarks}
                        disabled={false}
                        name="time factor (ns)"
                    />
                    <h4>Module number</h4>
                    <InputNumber
                        min={1}
                        max={totalNumberOfModules}
                        step={1}
                        value={Number(module)}
                        onChange={(value): void => {
                            setModule(value as Module);
                        }}
                        disabled={false}
                    />
                </div>
                <div style={{ padding: 12 }}>
                    <h4>Time factor</h4>

                    <Slider
                        min={0}
                        max={100}
                        step={1}
                        initialValue={timeFactor}
                        overrideValue={timeFactor}
                        onChange={(_, value) => {
                            setTimeFactor(value);
                        }}
                        disabled={false}
                        name="time factor (ns)"
                    />
                </div>
            </div>
        )
    );
};

export default AdminUI;
