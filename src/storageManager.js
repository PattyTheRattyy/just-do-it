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
      let data = JSON.parse(proj);
      let reconProj = reconstructProject(data);
      return reconProj;
    } else {
      console.log("Project data not found in local storage");
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

  function reconstructProject(data) {
    let proj = new project(data.title);
    proj.todos = reconstructTodos(data.todos);

    return proj;
  }

  function reconstructTodos(data) {
    let todos = new Array();
    for (let t in data) {
      let todoData = data[t];
      let reconTodo = new todo(
        todoData.title,
        todoData.description,
        todoData.dueDate,
        todoData.priority,
        todoData.complete,
        todoData.id
      );
      todos.push(reconTodo);
    }
    return todos;
  }

  function clearStorage() {
    localStorage.clear();
  }

  return { hello, saveProject, loadProject, loadAllProjects, clearStorage };
})();
