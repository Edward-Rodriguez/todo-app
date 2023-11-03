import format from 'date-fns/format';
import Todo from './todo';
import Project from './project';
import Storage from './storage';
import todoComponent from './components/todoContainer/todoContainer';
import { nav } from './components/nav/nav';
import { header } from './components/header/header';
import editDialog from './components/editDialog/editDialog';
import AddIcon from './assets/img/add_icon_green.svg';
import AddFilledIcon from './assets/img/add_icon_green_filled.svg';
import './assets/css/index.css';

const displayController = (() => {
  const storage = Storage();
  const pageContainer = document.querySelector('body');
  const addTaskButton = document.createElement('button');
  const addTaskIcon = document.createElement('img');
  const addTaskFilledIcon = document.createElement('img');
  const main = document.createElement('main');

  updateTodoListDisplay(storage.todos);

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
  const navComponent = nav();
  const navProjectList = navComponent.querySelectorAll('[data-project-id]');

  Array.from(navProjectList).forEach((navProjectItem) => {
    navProjectItem.addEventListener('click', (ev) =>
      clickHandlerNavProject(ev)
    );
  });

  function clickHandlerAddTaskButton() {
    const newTodo = Todo(++storage.maxTodoId);
    const editDialogBox = editDialog(newTodo);
    document.documentElement.appendChild(editDialogBox);
    editDialogBox.showModal();
    editDialogBox.addEventListener('close', () => {
      const todoExists = storage.todos.find((todo) => todo.id === newTodo.id);
      if (todoExists) {
        main.insertBefore(todoComponent(todoExists), addTaskButton);
      }
    });
  }

  // refresh list of todos displayed
  function updateTodoListDisplay(todoList) {
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
      const project = storage.projects.find(
        (proj) =>
          proj.id === +ev.target.closest('[data-project-id]').dataset.projectId
      );
      updateTodoListDisplay(
        storage.todos.filter((todo) => todo.project === project.title)
      );
    }
  }

  pageContainer.append(header(), navComponent, main);
})();
