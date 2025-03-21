import { editor } from "monaco-editor";
import { Options } from "../types";
import { groupCSS } from "css-comment-grouper";
import { exampleCSS } from "./example-css";

const inputEditor = editor.create(document.getElementById("inputEditor")!, {
  value: "",
  language: "scss",
  automaticLayout: true,
  theme: "vs-dark",
  lineHeight: 22,
});

const outputEditor = editor.create(document.getElementById("outputEditor")!, {
  value: "",
  language: "scss",
  automaticLayout: true,
  theme: "vs-dark",
  lineHeight: 22,
});
  
inputEditor.setValue(exampleCSS);
outputEditor.setValue(groupCSS(inputEditor.getValue(), {} as Options))

inputEditor.getModel().onDidChangeContent((e: any) => {
  try {
    outputEditor.setValue(groupCSS(inputEditor.getValue(), {} as Options))
  } catch (e) {
    console.error(e)
  } 
})

export {
  inputEditor,
  outputEditor
}