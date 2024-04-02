import {
    BG_DARK,
    BRIGHT_PURPLE_DARKER,
    LIGHT_GREY,
    BG_MEDIUM,
    MID_GREY_DARKER
} from "../../constants/colors";

const theme = {
    token: {
        colorPrimary: BRIGHT_PURPLE_DARKER,
        colorBgContainer: BG_DARK,
        colorTextBase: LIGHT_GREY,
        colorBgLayout: BG_MEDIUM,
        colorBorder: MID_GREY_DARKER,
    },
    components: {
        Button: {
            defaultColor: BG_DARK,
            primaryColor: BG_DARK,
        },
        Layout: {
            siderBg: BG_DARK,
            headerColor: LIGHT_GREY,
            headerBg: BG_DARK,
            contentBg: BG_DARK,
        },
    },
};


export default theme