export default function Storage() {
  const todos_key = 'todos';
  const projects_key = 'projects';
  let todos = JSON.parse(localStorage.getItem(todos_key)) || [];
  let projects = JSON.parse(localStorage.getItem(projects_key)) || [];

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
