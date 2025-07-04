import "./styles.css";
import { todo } from "./todos.js";
import { project } from "./projects.js";
import { homePage } from "./homepage.js";
import { storageManager } from "./storageManager.js";

let proj = storageManager.loadProject("Default");
console.log(proj);
