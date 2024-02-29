import { outputEditor } from "./initCodeEditors";

document.getElementById("copyResultsButton")?.addEventListener("click", (e) => {
  // Animation related stuff
  document.querySelector("#copyResultsButton img")?.setAttribute("src", "./images/checkmarkIcon.png");
  
  setTimeout(() => {
    (document.querySelector("#copyResultsButton") as HTMLElement).style.opacity = ".3";
  }, 700)

  setTimeout(() => {
    document.querySelector("#copyResultsButton img")?.setAttribute("src", "./images/copyIcon.png");

    window.requestAnimationFrame(() => {
      (document.querySelector("#copyResultsButton") as HTMLElement).style.opacity = "1";
    });
  }, 1000)

  // Actual copying
  navigator.clipboard.writeText(outputEditor?.getModel()?.getValue() || "");
});

