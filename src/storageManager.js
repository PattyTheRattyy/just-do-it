import { project } from "./projects.js";
import { todo } from "./todos.js";

export const storageManager = (function () {
  function hello() {
    console.log("hello, I am the saving manager!");
  }

  function loadProject(project) {
    let proj = localStorage.getItem(project);
    if (proj) {
      return JSON.parse(proj);
    } else {
      console.log("Project not found in local storage");
    }
  }

  function saveProject(project) {
    // remove clear line later this is for development purposessss
    localStorage.clear();
    console.log("saving project...");
    let jsonProj = JSON.stringify(project);
    localStorage.setItem(project.title, jsonProj);
  }

  return { hello, saveProject, loadProject };
})();
