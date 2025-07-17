export class project {
  constructor(title, id = crypto.randomUUID()) {
    this.title = title;
    this.todos = new Array();
    this.id = id;
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(todo) {
    let index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
  }
}
