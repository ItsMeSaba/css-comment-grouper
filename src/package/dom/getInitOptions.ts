import { Options } from "../../types";

const defaultOptions: Options = {
    indent: 4,
}

export function getInitOptions() {
    const savedOptionsRaw = localStorage.getItem("options");

    if (!savedOptionsRaw) return defaultOptions;

    try {
        return JSON.parse(savedOptionsRaw);
    } catch (e) {
        return defaultOptions;
    }
}