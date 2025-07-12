import { storageManager } from "./storageManager";
import editImage from "../assets/images/note-edit-outline.png";
import completeImage from "../assets/images/check-circle-outline.png";

export function domManip() {
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
