import { theme } from "antd";

import {
    BG_DARK,
    BRIGHT_PURPLE_DARKER,
    LIGHT_GREY,
    BG_MEDIUM,
    MID_GREY_DARKER,
    OVERLAY_GREY,
} from "../constants/colors";
import { zStacking } from "../constants/z-stacking";

const customTheme = {
    algorithm: theme.darkAlgorithm,
    token: {
        fontFamily: "Open Sans, sans-serif",
        borderRadius: 4,
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
            defaultGhostColor: BRIGHT_PURPLE_DARKER,
            defaultGhostBorderColor: BRIGHT_PURPLE_DARKER,
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
            handleLineWidthHover: 0,
        },
        Progress: {
            defaultColor: BRIGHT_PURPLE_DARKER,
            colorSuccess: BRIGHT_PURPLE_DARKER,
        },
        Dropdown: {
            colorBgElevated: OVERLAY_GREY,
            controlItemBgHover: OVERLAY_GREY,
            colorText: LIGHT_GREY,
        },
        Popover: {
            colorBgElevated: "#000000CC",
            colorBorder: "#6E6E6E",
            fontSize: 12,
            fontWeight: 400,
            colorText: LIGHT_GREY,
            borderRadiusXS: 4,
            borderRadiusLG: 4,
            zIndexPopup: zStacking.top,
        },
    },
};

export default customTheme;
