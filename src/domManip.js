import { storageManager } from "./storageManager";
import { project } from "./projects";
import editImage from "../assets/images/note-edit-outline.png";
import completeImage from "../assets/images/check-circle-outline.png";

export function domManip() {
  loadSidebar();
}

function loadSidebar() {
  let projects = storageManager.loadAllProjects();
  console.log(projects);

  const sidebar = document.querySelector("#sidebar");

  for (let p in projects) {
    let proj = projects[p];

    let projPDiv = document.createElement("div");
    let projP = document.createElement("p");
    projP.textContent = proj.title;
    projPDiv.appendChild(projP);
    sidebar.appendChild(projPDiv);

    projPDiv.addEventListener("click", () => {
      displayProj(proj);
    });
  }
}

function displayProj(proj) {
  let mainTitle = document.querySelector(".main-titles");
  mainTitle.textContent = proj.title;

  let projGrid = document.querySelector(".projects-grid");
  projGrid.replaceChildren();
  for (let t in proj.todos) {
    let todo = proj.todos[t];
    displayTodo(todo);
  }
}

function displayTodo(todo) {
  let projGrid = document.querySelector(".projects-grid");

  let card = document.createElement("div");
  card.classList.add("card");

  let top = document.createElement("div");
  top.classList.add("top");

  let title = document.createElement("p");
  title.textContent = todo.title;
  title.classList.add("card-title");

  let description = document.createElement("p");
  description.textContent = todo.description;
  description.classList.add("card-info");

  let bottom = document.createElement("div");
  bottom.classList.add("bottom");

  let editImg = document.createElement("img");
  editImg.src = editImage;
  editImg.classList.add("card-img");

  let completeImg = document.createElement("img");
  completeImg.src = completeImage;
  completeImg.classList.add("card-img");

  top.append(title, description);
  bottom.append(editImg, completeImg);
  card.append(top, bottom);
  projGrid.appendChild(card);
}

const newProject = document.querySelector(".newProject");
const dialog = document.querySelector("dialog");

newProject.addEventListener("click", function () {
  dialog.showModal();
});

const addProj = document.querySelector(".addProj");
const addProjForm = document.querySelector(".addProjForm");

addProjForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = addProjForm.title.value;
  console.log(title);

  let newProj = new project(title);
  storageManager.saveProject(newProj);

  dialog.close();
  addProjForm.reset();
});
