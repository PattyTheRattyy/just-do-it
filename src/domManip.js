import { storageManager } from "./storageManager";
import { project } from "./projects";
import { todo } from "./todos";
import editImage from "../assets/images/note-edit-outline.png";
import completeImage from "../assets/images/check-circle-outline.png";
import addImage from "../assets/images/plus-circle-outline.png";

export function domManip() {
  loadSidebar();
}

function loadSidebar() {
  let projects = storageManager.loadAllProjects();
  console.log(projects);

  const sidebar = document.querySelector("#sidebar");
  sidebar.replaceChildren();

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
  displayAddCard();
}

function displayAddCard() {
  let projGrid = document.querySelector(".projects-grid");

  let addCard = document.createElement("div");
  addCard.classList.add("add-card");

  let addImg = document.createElement("img");
  addImg.classList.add("addTodo");
  addImg.src = addImage;

  addCard.appendChild(addImg);
  projGrid.appendChild(addCard);
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
const projDialog = document.querySelector(".projDialog");

newProject.addEventListener("click", function () {
  projDialog.showModal();
});

const addProjForm = document.querySelector(".addProjForm");

addProjForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = addProjForm.title.value;
  console.log(title);

  let newProj = new project(title);
  storageManager.saveProject(newProj);

  loadSidebar();

  projDialog.close();
  addProjForm.reset();
});

const todoDialog = document.querySelector(".todoDialog");

const addTodoImg = document.querySelector(".addTodo");
addTodoImg.addEventListener("click", function () {
  todoDialog.showModal();
});

const addTodoForm = document.querySelector(".addTodoForm");

addTodoForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = addTodoForm.title.value;
  const description = addTodoForm.description.value;
  const dueDate = addTodoForm.dueDate.value;
  const priority = addTodoForm.priority.value;
  // const complete = addTodoForm.complete.value;

  let newTodo = new todo(title, description, dueDate, priority);
  let projTitle = document.querySelector(".main-titles").textContent;
  let proj = storageManager.loadProject(projTitle);
  proj.addTodo(newTodo);
  displayProj(proj);

  todoDialog.close();
  addTodoForm.reset();
});
