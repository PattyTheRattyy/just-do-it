export class project {
  constructor(title) {
    this.title = title;
    this.todos = new Array();
  }

  get todoList() {
    return this.todos;
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(todo) {
    let index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
  }
}
