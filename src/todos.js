export class todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = false;
    this.id = crypto.randomUUID();
  }
  changeTitle(newTitle) {
    this.title = newTitle;
  }
  changeDescription(newDescription) {
    this.description = newDescription;
  }
  changeDueDate(newDueDate) {
    this.dueDate = newDueDate;
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
