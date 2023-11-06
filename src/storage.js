/* eslint-disable no-use-before-define */
export default function Storage() {
  const todosKey = 'todos';
  const projectsKey = 'projects';
  let todos = JSON.parse(localStorage.getItem(todosKey)) || [];
  let projects = JSON.parse(localStorage.getItem(projectsKey)) || [];
  let maxTodoId = getMaxId(todos);
  let maxProjectId = getMaxId(projects);

  function addTodo(newTodo) {
    const dupTitleCount = duplicateTitleCount(todos, newTodo.title);
    const newTodoToAdd = newTodo;
    if (dupTitleCount > 0) newTodoToAdd.title += `(${dupTitleCount})`;
    maxTodoId += 1;
    todos.push(newTodo);
    localStorage.setItem(todosKey, JSON.stringify(todos));
  }

  function removeTodo(todoId) {
    localStorage.setItem(
      todosKey,
      JSON.stringify(todos.filter((todo) => todo.id !== +todoId)),
    );
  }

  function updateTodo(todoId, updatedTodo) {
    const indexToUpdate = todos.findIndex((todo) => todo.id === todoId);
    todos[indexToUpdate] = updatedTodo;
    localStorage.setItem(todosKey, JSON.stringify(todos));
  }

  function addProject(newProject) {
    const dupTitleCount = duplicateTitleCount(projects, newProject.title);
    const newProjectToAdd = newProject;
    if (dupTitleCount > 0) newProjectToAdd.title += `(${dupTitleCount})`;
    maxProjectId += 1;
    projects.push(newProject);
    localStorage.setItem(projectsKey, JSON.stringify(projects));
  }

  function removeProject(projectId) {
    localStorage.setItem(
      projectsKey,
      JSON.stringify(projects.filter((project) => project.id !== +projectId)),
    );
  }

  function duplicateTitleCount(arr, title) {
    const regex = new RegExp(`^${title}[(/d)]?`);
    const duplicateCount = arr.filter(
      (obj) => obj.title === title || regex.test(obj.title),
    ).length;
    return duplicateCount;
  }

  function getMaxId(obj) {
    let maxId = 0;
    if (obj.length !== 0)
      obj.forEach((entry) => {
        if (entry.id > maxId) maxId = entry.id;
      });
    return maxId;
  }

  return {
    addTodo,
    removeTodo,
    updateTodo,
    addProject,
    removeProject,
    get maxTodoId() {
      return maxTodoId;
    },
    set maxTodoId(newId) {
      maxTodoId = newId;
    },
    get maxProjectId() {
      return maxProjectId;
    },
    set maxProjectId(newProjectId) {
      maxProjectId = newProjectId;
    },
    get todos() {
      todos = JSON.parse(localStorage.getItem(todosKey)) || [];
      return todos;
    },
    set todos(newTodos) {
      localStorage.setItem(todosKey, JSON.stringify(newTodos));
    },
    get projects() {
      projects = JSON.parse(localStorage.getItem(projectsKey)) || [];
      return projects;
    },
    set projects(newProjects) {
      localStorage.setItem(projectsKey, JSON.stringify(newProjects));
    },
  };
}
