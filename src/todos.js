export class todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = false;
  }
  changeTitle(newPriority) {
    this.priority = newPriority;
  }
  changeDescription(newPriority) {
    this.priority = newPriority;
  }
  changeDueDate(newPriority) {
    this.priority = newPriority;
  }
  changePriority(newPriority) {
    this.priority = newPriority;
  }
  toggleComplete() {
    if (this.complete == false) {
      this.complete = true;
    } else {
      this.complete = false;
    }
  }
}
