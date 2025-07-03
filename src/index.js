import "./styles.css";
import { todo } from "./todos.js";
import { project } from "./projects.js";

let testTodo = new todo("heyo", "heyo", "heyo", "heyo", "heyo");
console.log(testTodo);

let testProject = new project("testy");
console.log(testProject);
testProject.addTodo(testTodo);
console.log(testProject.todoList);
