import "./styles.css";
import { storageManager } from "./storageManager.js";
import { domManip } from "./domManip.js";
import { project } from "./projects.js";
import { todo } from "./todos.js";

let proj = storageManager.loadProject("second");
let test2do = new todo("hey", "hey", "jru", "hey");
proj.addTodo(test2do);
storageManager.saveProject(proj);
console.log(proj);

domManip();
