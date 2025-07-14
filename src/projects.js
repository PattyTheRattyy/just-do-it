export class project {
  constructor(title) {
    this.title = title;
    this.todos = new Array();
    this.id = crypto.randomUUID();
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(todo) {
    let index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
  }
}
