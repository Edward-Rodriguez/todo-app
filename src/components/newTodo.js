let todoId = 0;

export default function newTodo(
  title,
  dueDate,
  priority,
  project,
  notes,
  checklist
) {
  const newTodo = Todo(title, dueDate, priority, project, notes, checklist);
  return newTodo;
}

function Todo(title, dueDate, priority, project, notes, checklist = []) {
  const id = ++todoId;

  return {
    get id() {
      return id;
    },
    get title() {
      return title;
    },
    set title(newTitle) {
      title = newTitle;
    },
    get dueDate() {
      return dueDate;
    },
    set dueDate(newDueDate) {
      dueDate = newDueDate;
    },
    get priority() {
      return priority;
    },
    set priority(newPriority) {
      priority = newPriority;
    },
    get project() {
      return project;
    },
    set project(newProject) {
      project = newProject;
    },
    get notes() {
      return notes;
    },
    set notes(newNote) {
      notes = newNote;
    },
    get checklist() {
      return checklist;
    },
  };
}
