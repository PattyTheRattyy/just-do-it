import { storageManager } from "./storageManager";

export function domManip() {
  let projects = storageManager.loadAllProjects();
  console.log(projects);

  for (let p in projects) {
    let proj = projects[p];
    displayProj(proj);
  }
}

let main = document.querySelector("#main");

function displayProj(proj) {
  let projectHeading = document.createElement("h1");
  projectHeading.textContent = proj.title;
  main.append(projectHeading);

  for (let t in proj.todos) {
    let todo = proj.todos[t];
    displayTodo(todo);
  }
}

function displayTodo(todo) {
  for (const [key, value] of Object.entries(todo)) {
    console.log(`${(key, value)}`);

    // dont display id
    if (key == "id") {
      continue;
    }

    let keyValDiv = document.createElement("div");
    keyValDiv.classList.add("keyValDiv");
    let todoKey = document.createElement("p");
    let todoValue = document.createElement("p");
    todoKey.textContent = key + ":";
    todoValue.textContent = value;
    keyValDiv.append(todoKey, todoValue);
    main.appendChild(keyValDiv);
  }
}
