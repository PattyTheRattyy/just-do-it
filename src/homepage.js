import { todo } from "./todos.js";
import { project } from "./projects.js";

export function homePage() {
  let defaultTodo = new todo(
    "go to gym",
    "Push day 5x leg squats lets go",
    "Jul 3rd",
    "HIGH"
  );
  console.log(defaultTodo);

  let defaultProject = new project("Default");
  console.log(defaultProject);

  defaultProject.addTodo(defaultTodo);
  console.log(defaultProject.todoList);

  defaultTodo.toggleComplete();
  console.log(defaultTodo);
}
