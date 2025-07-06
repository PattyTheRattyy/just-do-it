import "./styles.css";
import { storageManager } from "./storageManager.js";
import { domManip } from "./domManip.js";
import { project } from "./projects.js";
import { todo } from "./todos.js";

domManip();

// let secondProj3 = new project("default");
// let secondTodo4 = new todo("44", "ghu44rt", "phea44sible", "les44sgo");
// secondProj3.addTodo(secondTodo3);

let proj = storageManager.loadProject("default");
console.log(proj);
let secondTodo4 = new todo("44", "ghu44rt", "phea44sible", "les44sgo");
proj.addTodo(secondTodo4);
