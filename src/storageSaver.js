import { project } from "./projects.js";
import { todo } from "./todos.js";

export const savingManager = (function () {
  function hello() {
    console.log("hello, I am the saving manager!");
  }

  function saveProject(project) {
    // remove clear line later this is for development purposessss
    localStorage.clear();
    console.log("saving project...");
    let jsonProj = JSON.stringify(project);
    localStorage.setItem(`${project.title}`, jsonProj);
  }

  return { hello, saveProject };
})();
