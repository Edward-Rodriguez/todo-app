export default function Project(id, title, todos, color) {
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
    get color() {
      return color;
    },
    set color(newColor) {
      color = newColor;
    },
  };
}
