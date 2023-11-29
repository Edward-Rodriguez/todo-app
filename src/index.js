/* eslint-disable no-use-before-define */
import { format, isAfter } from 'date-fns';
import Todo from './todo';
import Storage from './storage';
import todoComponent from './components/todoContainer/todoContainer';
import navigation from './components/nav/nav';
import { header } from './components/header/header';
import editDialog from './components/editDialog/editDialog';
import AddIcon from './assets/img/add_icon_green.svg';
import AddFilledIcon from './assets/img/add_icon_green_filled.svg';
import projectDialog from './components/projectDialog/projectDialog';
import './assets/css/index.css';

// eslint-disable-next-line wrap-iife
(function displayController() {
  const storage = Storage();
  const pageContainer = document.querySelector('body');
  const addTaskButton = document.createElement('button');
  const addTaskIcon = document.createElement('img');
  const addTaskFilledIcon = document.createElement('img');
  const main = document.createElement('main');
  const projectHeader = document.createElement('h3');
  let currentProject = null;

  refreshTodoList(storage.todos);

  pageContainer.setAttribute('id', 'page-container');
  main.setAttribute('id', 'content');
  addTaskIcon.src = AddIcon;
  addTaskIcon.setAttribute('id', 'add-task-icon');
  addTaskFilledIcon.setAttribute('id', 'add-task-filled-icon');
  addTaskFilledIcon.src = AddFilledIcon;
  addTaskButton.textContent = 'Add Task';
  addTaskButton.setAttribute('id', 'add-task-btn');
  addTaskButton.prepend(addTaskIcon);
  addTaskButton.prepend(addTaskFilledIcon);
  addTaskButton.addEventListener('click', clickHandlerAddTaskButton);
  pageContainer.append(header(), navigation.nav, main);

  const addProjectButton = document.querySelector('#project-header button');
  addProjectButton.addEventListener('click', clickHandlerAddProject);
  initNavItems();

  function initNavItems() {
    const navMenuItems = navigation.nav.querySelectorAll('.menu-item');
    const navProjectList = navigation.nav.querySelectorAll('[data-project-id]');
    Array.from(navMenuItems).forEach((menuItem) => {
      menuItem.addEventListener('click', () => clickHandlerMenuItem(menuItem));
    });
    Array.from(navProjectList).forEach((navItem) => {
      navItem.addEventListener('click', (ev) => clickHandlerNavProject(ev));
    });
  }

  function clickHandlerAddTaskButton() {
    const newTodo = Todo((storage.maxTodoId += 1));
    const editDialogBox = editDialog(newTodo);
    document.documentElement.appendChild(editDialogBox);
    editDialogBox.showModal();
    editDialogBox.addEventListener('close', () => {
      const todoExists = storage.todos.find((todo) => todo.id === newTodo.id);
      if (
        todoExists &&
        (!currentProject || todoExists.projectId === currentProject.id)
      ) {
        main.insertBefore(todoComponent(todoExists), addTaskButton);
        navigation.refreshAllTodoCounts();
      }
      // filter todos if there is a current project selected
      const todoListToDisplay = currentProject
        ? storage.todos.filter((todo) => todo.projectId === currentProject.id)
        : storage.todos;
      refreshTodoList(todoListToDisplay);
      navigation.refreshAllTodoCounts();
    });
  }

  // refresh list of todos displayed
  function refreshTodoList(todoList) {
    main.textContent = '';
    main.appendChild(projectHeader);
    updateProjectHeader();
    todoList.forEach((todo) => {
      main.appendChild(todoComponent(todo));
    });
    main.appendChild(addTaskButton);
  }

  // filter list of todos based on project
  function clickHandlerNavProject(ev) {
    if (!ev.target.classList.contains('project-delete-icon')) {
      // if not clicking delete button
      const project = storage.projects.find((proj) => {
        const parentMenuItem = ev.target.closest('[data-project-id]');
        return proj.id === +parentMenuItem.dataset.projectId;
      });
      currentProject = project;
      refreshTodoList(
        storage.todos.filter((todo) => todo.projectId === project.id),
      );
    }
  }

  function clickHandlerMenuItem(elem) {
    let filteredTodoList;
    let newProjectHeading;
    currentProject = null;
    const criteria = elem
      .querySelector('.menu-item-title')
      .textContent.toUpperCase();
    if (criteria === 'TODAY') {
      filteredTodoList = storage.todos.filter(
        (todo) => todo.dueDate === format(new Date(), 'yyyy-MM-dd'),
      );
      const dot = '\u{00B7}';
      newProjectHeading = `Today ${dot} ${format(
        new Date(),
        'MMM d',
      )} ${dot} ${format(new Date(), 'EEEE')}`;
      updateProjectHeader(newProjectHeading);
    } else if (criteria === 'UPCOMING') {
      filteredTodoList = storage.todos.filter((todo) =>
        isAfter(new Date(todo.dueDate), new Date()),
      );
      newProjectHeading = 'Upcoming';
    } else filteredTodoList = storage.todos;
    refreshTodoList(filteredTodoList);
    updateProjectHeader(newProjectHeading);
  }

  function clickHandlerAddProject() {
    const projectDialogBox = projectDialog();
    document.documentElement.appendChild(projectDialogBox);
    projectDialogBox.showModal();
    projectDialogBox.addEventListener('close', () => {
      navigation.refreshProjectList();
      initNavItems(); // to add event handlers to new projects
    });
  }

  function updateProjectHeader(newHeading) {
    if (currentProject) {
      projectHeader.textContent = currentProject.title;
    } else projectHeader.textContent = newHeading;
  }
})();
