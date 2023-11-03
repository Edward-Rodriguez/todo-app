export default function Storage() {
  const todos_key = 'todos';
  const projects_key = 'projects';
  let todos = JSON.parse(localStorage.getItem(todos_key)) || [];
  let projects = JSON.parse(localStorage.getItem(projects_key)) || [];
  let maxTodoId = getMaxId(todos);
  let maxProjectId = getMaxId(projects);

  function addTodo(newTodo) {
    const dupTitleCount = duplicateTitleCount(todos, newTodo.title);
    if (dupTitleCount > 0) newTodo.title += `(${dupTitleCount})`;
    maxTodoId++;
    todos.push(newTodo);
    localStorage.setItem(todos_key, JSON.stringify(todos));
  }

  function removeTodo(todoId) {
    localStorage.setItem(
      todos_key,
      JSON.stringify(todos.filter((todo) => todo.id !== +todoId))
    );
  }

  function updateTodo(todoId, updatedTodo) {
    const indexToUpdate = todos.findIndex((todo) => todo.id === todoId);
    todos[indexToUpdate] = updatedTodo;
    localStorage.setItem(todos_key, JSON.stringify(todos));
  }

  function addProject(newProject) {
    const dupTitleCount = duplicateTitleCount(projects, newProject.title);
    if (dupTitleCount > 0) newProject.title += `(${dupTitleCount})`;
    maxProjectId++;
    projects.push(newProject);
    localStorage.setItem(projects_key, JSON.stringify(projects));
  }

  function updateProject(projectId, updatedProject) {
    const indexToUpdate = projects.findIndex(
      (project) => project.id === projectId
    );
    projects[indexToUpdate] = updatedProject;
    localStorage.setItem(projects_key, JSON.stringify(projects));
  }

  function removeProject(projectId) {
    localStorage.setItem(
      projects_key,
      JSON.stringify(projects.filter((project) => project.id !== +projectId))
    );
  }

  function duplicateTitleCount(arr, title) {
    const regex = new RegExp('^' + title + '[(/d)]?');
    let duplicateCount = arr.filter(
      (obj) => obj.title === title || regex.test(obj.title)
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
    updateProject,
    removeProject,
    get maxTodoId() {
      return maxTodoId;
      //
    },
    set maxTodoId(newId) {
      maxTodoId = newId;
      //
    },
    set maxProjectId(newProjectId) {
      maxProjectId = newProjectId;
      //
    },
    set maxTodoId(newId) {
      maxTodoId = newId;
      //
    },
    get maxProjectId() {
      return maxProjectId;
    },
    get todos() {
      todos = JSON.parse(localStorage.getItem(todos_key)) || [];
      return todos;
    },
    set todos(newTodos) {
      localStorage.setItem(todos_key, JSON.stringify(newTodos));
    },
    get projects() {
      projects = JSON.parse(localStorage.getItem(projects_key)) || [];
      return projects;
    },
    set projects(newProjects) {
      localStorage.setItem(projects_key, JSON.stringify(newProjects));
    },
  };
}
