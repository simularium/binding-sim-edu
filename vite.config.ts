import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    base: "https://staging.simularium.allencell.org/learn/binding-affinity",
    plugins: [react()],
    css: {
        modules: {
            localsConvention: "camelCaseOnly",
        },
    },

    server: {
        fs: {
            // Allow serving files from one level up to the project root
            allow: [".."],
        },
    },
});
