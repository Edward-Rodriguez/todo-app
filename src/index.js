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
import './index.css';

const displayController = (() => {
  const storage = Storage();
  const pageContainer = document.querySelector('body');
  const addTaskButton = document.createElement('button');
  const addTaskIcon = document.createElement('img');
  const addTaskFilledIcon = document.createElement('img');
  const main = document.createElement('main');
  const todos = storage.todos;

  // delete after completing
  const new_todo = Todo(
    storage.maxTodoId,
    'Read 5 pages',
    format(new Date(2023, 9, 18), 'yyyy-MM-dd')
  );
  // storage.addTodo(new_todo);

  const new_todo2 = Todo(
    storage.maxTodoId,
    'Exercise for 30min',
    format(new Date(2023, 9, 17), 'yyyy-MM-dd'),
    'high',
    'Daily',
    'Interval training on exercise bike',
    [
      'read while biking',
      'increase intensity by 1',
      'do arm strengthening exercises while biking',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    ]
  );
  // storage.addTodo(new_todo2);

  const new_todo3 = Todo(
    storage.maxTodoId,
    'Walk the dog',
    format(new Date(2023, 9, 17), 'yyyy-MM-dd'),
    'medium',
    'Daily',
    'Interval training on exercise bike',
    ['read while biking', 'do arm strengthening exercises while biking']
  );
  // storage.addTodo(new_todo3);

  const new_todo7 = Todo(
    storage.maxTodoId,
    'Read 5 pages',
    format(new Date(2024, 9, 17), 'yyyy-MM-dd'),
    'medium',
    'Daily',
    'Interval training on exercise bike',
    ['read while biking', 'do arm strengthening exercises while biking']
  );
  // storage.addTodo(new_todo7);

  const project = Project('Daily', [new_todo2, new_todo3]);
  const project2 = Project('TestProject', [new_todo, new_todo2]);
  const project3 = Project('Test3Proj', [new_todo, new_todo2]);
  const project4 = Project('Daily', [new_todo, new_todo2]);

  // storage.removeProject(3);
  // storage.removeTodo(1);
  // storage.addProject(project);
  storage.addProject(project3);
  storage.addProject(project4);

  todos.forEach((todo) => {
    main.appendChild(todoComponent(todo));
  });

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
  main.appendChild(addTaskButton);

  addTaskButton.addEventListener('click', clickHandlerAddTaskButton);

  function clickHandlerAddTaskButton() {
    const newTodo = Todo(++storage.maxTodoId);
    const editDialogBox = editDialog(newTodo);
    document.documentElement.appendChild(editDialogBox);
    editDialogBox.showModal();
  }

  pageContainer.append(header(), nav(), main);
})();
