import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import App from "./App.tsx";

import "./index.css";
import theme from "./style/theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ConfigProvider theme={theme}>
            <App />
        </ConfigProvider>
    </React.StrictMode>
);
