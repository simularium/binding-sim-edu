import { theme } from "antd";
import {
    BG_DARK,
    BRIGHT_PURPLE_DARKER,
    LIGHT_GREY,
    BG_MEDIUM,
    MID_GREY_DARKER
} from "../constants/colors";

const customTheme = {
    // 1. Use dark algorithm
    algorithm: theme.darkAlgorithm,
    token: {
        colorPrimary: BRIGHT_PURPLE_DARKER,
        colorBgContainer: BG_DARK,
        colorTextBase: LIGHT_GREY,
        colorBgLayout: BG_MEDIUM,
        colorBorder: MID_GREY_DARKER,
    },
    components: {
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
        },
        Slider: {
            trackBg: MID_GREY_DARKER,
            railBg: MID_GREY_DARKER,
            railHoverBg: MID_GREY_DARKER,
            trackHoverBg: MID_GREY_DARKER,
            handleColor: BRIGHT_PURPLE_DARKER,
            handleActiveColor: BRIGHT_PURPLE_DARKER,
            handleLineWidthHover: 0,
        },
    },
};


export default customTheme;