export default function Storage() {
  const todos_key = 'todos';
  const projects_key = 'projects';
  let todos = JSON.parse(localStorage.getItem(todos_key)) || [];
  if (typeof todos !== 'object') todos = [];
  let projects = JSON.parse(localStorage.getItem(projects_key)) || [];
  console.log(projects);
  if (typeof projects !== 'object') projects = [];

  function addTodo(newTodo) {
    const dupTitleCount = duplicateTitleCount(todos, newTodo.title);
    if (dupTitleCount > 0) newTodo.title += `(${dupTitleCount})`;
    todos.push(newTodo);
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

  function addProject(newProject) {
    const dupTitleCount = duplicateTitleCount(projects, newProject.title);
    if (dupTitleCount > 0) newProject.title += `(${dupTitleCount})`;
    projects.push(newProject);
    localStorage.setItem(projects_key, JSON.stringify(projects));
  }

  function removeProject(projectId) {
    localStorage.setItem(
      projects_key,
      JSON.stringify(projects.filter((project) => project.id !== projectId))
    );
  }

  function duplicateTitleCount(arr, title) {
    const regex = new RegExp('^' + title + '[(/d)]?');
    let duplicateCount = arr.filter(
      (obj) => obj.title === title || regex.test(obj.title)
    ).length;
    return duplicateCount;
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
