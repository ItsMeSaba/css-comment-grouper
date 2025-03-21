import { outputEditor } from "./init-code-editors";

document.getElementById("copyResultsButton")?.addEventListener("click", (e) => {
  // Animation related stuff
  document.querySelector("#copyResultsButton img")?.setAttribute("src", "./assets/checkmarkIcon.png");
  
  setTimeout(() => {
    (document.querySelector("#copyResultsButton") as HTMLElement).style.opacity = ".3";
  }, 700)

  setTimeout(() => {
    document.querySelector("#copyResultsButton img")?.setAttribute("src", "./assets/copyIcon.png");

    window.requestAnimationFrame(() => {
      (document.querySelector("#copyResultsButton") as HTMLElement).style.opacity = "1";
    });
  }, 1000)

  // Actual copying
  navigator.clipboard.writeText(outputEditor?.getModel()?.getValue() || "");
});

