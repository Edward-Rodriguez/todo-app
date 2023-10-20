let projectId = 0;

export default function Project(title, todos) {
  const id = ++projectId;

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
    get todos() {
      return todos;
    },
    set todos(newTodos) {
      todos = newTodos;
    },
  };
}
