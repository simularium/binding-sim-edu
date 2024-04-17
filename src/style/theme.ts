import { theme } from "antd";

import {
    BG_DARK,
    BRIGHT_PURPLE_DARKER,
    LIGHT_GREY,
    BG_MEDIUM,
    MID_GREY_DARKER
} from "../constants/colors";

const customTheme = {
    algorithm: theme.darkAlgorithm,
    token: {
        colorPrimary: BRIGHT_PURPLE_DARKER,
        colorBgContainer: BG_DARK,
        colorBgLayout: BG_MEDIUM,
        colorBorder: MID_GREY_DARKER,
    },
    components: {
        Radio: {
            colorBorder: BG_DARK,
            colorBgContainer: BRIGHT_PURPLE_DARKER,
            colorText: BG_DARK,
            buttonBg: BRIGHT_PURPLE_DARKER,
            buttonCheckedBg: BG_DARK,
            dotSize: 9,
        },
        InputNumber: {
            colorBgContainer: BRIGHT_PURPLE_DARKER,
        },
        Button: {
            defaultColor: BRIGHT_PURPLE_DARKER,
            defaultBorderColor: BRIGHT_PURPLE_DARKER,
            primaryColor: BG_DARK,
        },
        Layout: {
            siderBg: BG_DARK,
            headerColor: LIGHT_GREY,
            headerBg: BG_DARK,
            contentBg: BG_DARK,
            colorText: LIGHT_GREY,
        },
        Slider: {
            trackBg: MID_GREY_DARKER,
            railBg: MID_GREY_DARKER,
            railHoverBg: MID_GREY_DARKER,
            trackHoverBg: MID_GREY_DARKER,
            handleColor: BRIGHT_PURPLE_DARKER,
            handleActiveColor: BRIGHT_PURPLE_DARKER,
        },
        Progress: {
            defaultColor: BRIGHT_PURPLE_DARKER,
        },
    },
};


export default customTheme;