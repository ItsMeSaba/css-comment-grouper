import { Options } from "../../types";

export function displayOptions(options: Options) {
    const indentOptions = document.getElementById("indentOption") as HTMLInputElement;

    indentOptions.value = String(options.indent);
}