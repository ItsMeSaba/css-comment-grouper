import { Options } from "../../types";

export function initIndentOption(options: Options) {
    document.getElementById("indentOption")?.addEventListener("input", e => {
        options.indent = parseInt((e.target as any).value)

        localStorage.setItem("options", JSON.stringify(options));
    })
}
