import { editor } from "monaco-editor";
import "./style.css";
import { GroupCSS } from "./package";
import { initIndentOption } from "./package/dom/initIndentOption";
import { Options } from "./types";
import { getInitOptions } from "./package/dom/getInitOptions";
import { displayOptions } from "./package/dom/displayOptions";
import "postcss-scss"

const inputEditor = editor.create(document.getElementById("inputEditor")!, {
	value: "",
	language: "scss",
	automaticLayout: true,
	theme: "vs-dark",
});

const outputEditor = editor.create(document.getElementById("outputEditor")!, {
	value: "",
	language: "scss",
	automaticLayout: true,
	theme: "vs-dark",
});

// const options: Options = getInitOptions();

// initIndentOption(options);

// displayOptions(options);

(inputEditor as any).getModel().onDidChangeContent((e: any) => {
    outputEditor.setValue(GroupCSS(inputEditor.getValue(), {} as Options))
})