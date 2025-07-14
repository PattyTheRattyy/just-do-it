import { storageManager } from "./storageManager";
import { project } from "./projects";
import { todo } from "./todos";
import editImage from "../assets/images/note-edit-outline.png";
import completeImage from "../assets/images/check-circle-outline.png";
import addImage from "../assets/images/plus-circle-outline.png";

// IF there are no projects in local stoarge, then make a default project and have dom manip load the first project in storage

export function domManip() {
  if (storageManager.isEmpty()) {
    defaultProject();
  } else {
    const firstProj = storageManager.loadFirstProject();
    displayProj(firstProj);
  }

  loadSidebar();
  projDialog();
}

function defaultProject() {
  const defaultProj = new project("Default Project");
  storageManager.saveProject(defaultProj);
  displayProj(defaultProj);
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
  todoDialogFN();
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

function projDialog() {
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
}

const todoDialog = document.querySelector(".todoDialog");

function todoDialogFN() {
  const addCard = document.querySelector(".add-card");
  addCard.addEventListener("click", function () {
    todoDialog.showModal();
  });
}

const addTodoForm = document.querySelector(".addTodoForm");

addTodoForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = addTodoForm.title.value;
  console.log(`Title: ${title}`);
  const description = addTodoForm.description.value;
  console.log(`Desc: ${description}`);
  const dueDate = addTodoForm.dueDate.value;
  console.log(`Date: ${dueDate}`);
  const priority = addTodoForm.priority.value;
  console.log(`Prior: ${priority}`);
  // const complete = addTodoForm.complete.value;

  if (title && description && dueDate && priority) {
    const newTodo = new todo(title, description, dueDate, priority);
    const projTitle = document.querySelector(".main-titles").textContent;
    const proj = storageManager.loadProject(projTitle);
    proj.addTodo(newTodo);
    storageManager.saveProject(proj);
    displayProj(proj);

    loadSidebar();
  }

  todoDialog.close();
  addTodoForm.reset();
});
