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
import './assets/css/index.css';

// eslint-disable-next-line wrap-iife
(function displayController() {
  const storage = Storage();
  const pageContainer = document.querySelector('body');
  const addTaskButton = document.createElement('button');
  const addTaskIcon = document.createElement('img');
  const addTaskFilledIcon = document.createElement('img');
  const main = document.createElement('main');
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

  const navMenuItems = navigation.nav.querySelectorAll('.menu-item');
  const navProjectList = navigation.nav.querySelectorAll('[data-project-id]');

  Array.from(navMenuItems).forEach((menuItem) => {
    menuItem.addEventListener('click', () => clickHandlerMenuItem(menuItem));
  });
  Array.from(navProjectList).forEach((navItem) => {
    navItem.addEventListener('click', (ev) => clickHandlerNavProject(ev));
  });

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
        navigation.refreshProjectList();
      }
      // filter todos if there is a current project selected
      const todoListToDisplay = currentProject
        ? storage.todos.filter((todo) => todo.projectId === currentProject.id)
        : storage.todos;
      refreshTodoList(todoListToDisplay);
      navigation.refreshProjectList();
    });
  }

  // refresh list of todos displayed
  function refreshTodoList(todoList) {
    main.textContent = '';
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
    const criteria = elem
      .querySelector('.menu-item-title')
      .textContent.toUpperCase();
    if (criteria === 'TODAY') {
      filteredTodoList = storage.todos.filter(
        (todo) => todo.dueDate === format(new Date(), 'yyyy-MM-dd'),
      );
    } else if (criteria === 'UPCOMING') {
      filteredTodoList = storage.todos.filter((todo) =>
        isAfter(new Date(todo.dueDate), new Date()),
      );
    } else filteredTodoList = storage.todos;
    refreshTodoList(filteredTodoList);
  }

  pageContainer.append(header(), navigation.nav, main);
})();
