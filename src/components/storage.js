export default function storage() {
  const todos_key = 'todos';
  let todos = [];

  function addTodo(todo) {
    todos.push(todo);
    localStorage.setItem(todos_key, JSON.stringify(todos));
  }

  function getTodos() {
    todos = JSON.parse(localStorage.getItem(todos_key));
    return todos;
  }

  function removeTodo(todoId) {
    localStorage.setItem(
      todos_key,
      JSON.stringify(todos.filter((todo) => todo.id !== todoId))
    );
  }

  return { addTodo, getTodos, removeTodo };
}
