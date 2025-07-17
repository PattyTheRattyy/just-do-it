import { storageManager } from "./storageManager";
import { project } from "./projects";
import { todo } from "./todos";
import editImage from "../assets/images/note-edit-outline.png";
// import completeImage from "../assets/images/check-circle-outline.png";
import addImage from "../assets/images/plus-circle-outline.png";
import { formatDistanceToNow, isPast } from "date-fns";

// IF there are no projects in local stoarge, then make a default project and have dom manip load the first project in storage

export function domManip() {
  reload();
  loadSidebar();
  projDialog();
}

function reload() {
  if (storageManager.isEmpty()) {
    defaultProject();
  } else {
    const firstProj = storageManager.loadFirstProject();
    displayProj(firstProj);
  }
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
    projPDiv.classList.add("projPDiv");

    let projP = document.createElement("p");
    projP.classList.add("projP");
    projP.textContent = proj.title;

    let projDelBtn = document.createElement("button");
    projDelBtn.textContent = "X";
    projDelBtn.classList.add("projDelBtn");
    projDelBtn.addEventListener("click", function () {
      storageManager.deleteProject(proj.title);
      reload();
      loadSidebar();
    });

    projPDiv.append(projP, projDelBtn);
    sidebar.appendChild(projPDiv);

    projP.addEventListener("click", () => {
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

  let dueDate = document.createElement("p");
  if (isPast(todo.dueDate)) {
    dueDate.textContent = `Overdue`;
  } else {
    let daysLeft = formatDistanceToNow(todo.dueDate);
    dueDate.textContent = `Due in ${daysLeft}`;
  }
  dueDate.classList.add("card-info");

  let priority = document.createElement("p");
  priority.textContent = todo.priority;
  priority.classList.add("card-info");

  let complete = document.createElement("p");
  complete.textContent = todo.complete;
  complete.classList.add("card-info");

  let bottom = document.createElement("div");
  bottom.classList.add("bottom");

  let editImg = document.createElement("img");
  editImg.src = editImage;
  editImg.classList.add("card-img");
  editImg.addEventListener("click", function (e) {
    e.stopPropagation();
    console.log(`e.targ${e.target}`);
    console.log(todo.id);
    populateEditForm(todo);
    editTodoDialog.showModal();
  });

  // let completeImg = document.createElement("img");
  // completeImg.src = completeImage;
  // completeImg.classList.add("card-img");
  // completeImg.addEventListener("click", function () {
  //   // dont know if this is actually using the todo that was passed in?
  //   todo.toggleComplete();
  //   let projTitle = document.querySelector(".main-titles").textContent;
  //   storageManager.saveProject(projTitle);
  // });

  top.append(title, description, dueDate, priority, complete);
  bottom.append(editImg);
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
  console.log("testing");

  const title = addTodoForm.title.value;
  console.log(`Title: ${title}`);
  const description = addTodoForm.description.value;
  console.log(`Desc: ${description}`);
  const dueDate = addTodoForm.dueDate.value;
  console.log(`Date: ${dueDate}`);
  const priority = addTodoForm.priority.value;
  console.log(`Prior: ${priority}`);
  const complete = addTodoForm.complete.value;
  // if !complete {
  //  complete = false
  // }

  if (title && description && dueDate && priority) {
    const newTodo = new todo(title, description, dueDate, priority, complete);
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

const editTodoForm = document.querySelector(".editTodoForm");

function populateEditForm(todo) {
  editTodoForm.title.value = todo.title;
  editTodoForm.description.value = todo.description;
  editTodoForm.dueDate.value = todo.dueDate;
  editTodoForm.priority.value = todo.priority;
  editTodoForm.complete.value = todo.complete;
  editTodoForm.todoID.value = todo.id;
}

const editTodoDialog = document.querySelector(".editTodoDialog");

const saveTodoBtn = document.querySelector(".saveTodoBtn");

saveTodoBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const title = editTodoForm.title.value;
  console.log(`Title: ${title}`);
  const description = editTodoForm.description.value;
  console.log(`Desc: ${description}`);
  const dueDate = editTodoForm.dueDate.value;
  console.log(`Date: ${dueDate}`);
  const priority = editTodoForm.priority.value;
  console.log(`Prior: ${priority}`);
  const complete = editTodoForm.complete.value;
  console.log(`Complete: ${complete}`);
  const todoID = editTodoForm.todoID.value;
  console.log(`todoID: ${todoID}`);
  // if !complete {
  //  complete = false
  // }

  if (title && description && dueDate && priority) {
    const projTitle = document.querySelector(".main-titles").textContent;
    // const proj = storageManager.loadProjectEditForm(projTitle);
    const proj = storageManager.loadProject(projTitle);
    // load project calls reconstruct project which creates a new project which is why the IDs of all the todos change by the time I get here...
    // BUG FOUND!!! YAY

    for (let t in proj.todos) {
      let todo = proj.todos[t];
      console.log(todo);
      console.log("I MADE IT HERE");
      console.log(`todo.id: ${todo.id}`);
      console.log(`todoID: ${todoID}`);
      if (todo.id == todoID) {
        console.log("I ALSO MADE IT HERE");
        console.log(todo);
        todo.editTodo(title, description, dueDate, priority, complete);
        break;
      }
    }
    // todo.editTodo(title, description, dueDate, priority, complete);
    storageManager.saveProject(proj);

    displayProj(proj);
    loadSidebar();
  }

  editTodoDialog.close();
  editTodoForm.reset();
});
