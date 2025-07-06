import { project } from "./projects.js";
import { todo } from "./todos.js";

export const storageManager = (function () {
  function hello() {
    console.log("hello, I am the saving manager!");
  }

  // loads a specific project given the project title (Maybe this should be object like the save function for consistency)
  function loadProject(project) {
    let proj = localStorage.getItem(project);
    if (proj) {
      return JSON.parse(proj);
    } else {
      console.log("Project not found in local storage");
    }
  }

  function loadAllProjects() {
    let projects = new Array();

    for (let key in localStorage) {
      if (!localStorage.hasOwnProperty(key)) {
        continue;
      }
      let proj = loadProject(key);
      projects.push(proj);
    }
    return projects;
  }

  // saves a specific project to local storage given the project object
  function saveProject(project) {
    // remove clear line later this is for development purposessss
    console.log("saving project...");
    let jsonProj = JSON.stringify(project);
    localStorage.setItem(project.title, jsonProj);
  }

  return { hello, saveProject, loadProject, loadAllProjects };
})();
