export default function Storage() {
  const todos_key = 'todos';
  const projects_key = 'projects';
  let todos = JSON.parse(localStorage.getItem(todos_key)) || [];
  console.log('type of todos = ', typeof todos);
  if (typeof todos !== 'object') todos = [];
  let projects = JSON.parse(localStorage.getItem(projects_key)) || [];
  if (typeof projects !== 'object') projects = [];

  function addTodo(todo) {
    todos.push(todo);
    localStorage.setItem(todos_key, JSON.stringify(todos));
  }

  function removeTodo(todoId) {
    localStorage.setItem(
      todos_key,
      JSON.stringify(todos.filter((todo) => todo.id !== todoId))
    );
  }

  function updateTodo(todoId, updatedTodo) {
    console.log(todos);
    const indexToUpdate = todos.findIndex((todo) => todo.id === todoId);
    todos[indexToUpdate] = updatedTodo;
    localStorage.setItem(todos_key, JSON.stringify(todos));
  }

  function addProject(project) {
    projects.push(project);
    localStorage.setItem(projects_key, JSON.stringify(projects));
  }

  function removeProject(projectId) {
    localStorage.setItem(
      projects_key,
      JSON.stringify(projects.filter((project) => project.id !== projectId))
    );
  }

  return {
    addTodo,
    removeTodo,
    updateTodo,
    addProject,
    removeProject,
    get todos() {
      return todos;
    },
    get projects() {
      return projects;
    },
  };
}
