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
  const main = document.createElement('main');
  const todos = storage.todos;

  pageContainer.setAttribute('id', 'page-container');
  main.setAttribute('id', 'content');
  todos.forEach((todo) => {
    main.appendChild(todoComponent(todo));
  });
  addTaskIcon.src = AddIcon;
  addTaskButton.textContent = 'Add Task';
  addTaskButton.setAttribute('id', 'add-task-btn');
  addTaskButton.prepend(addTaskIcon);
  main.appendChild(addTaskButton);

  addTaskButton.addEventListener('mouseover', toggleAddButtonIcon);
  addTaskButton.addEventListener('mouseleave', toggleAddButtonIcon);
  addTaskButton.addEventListener('click', clickHandlerAddTaskButton);

  function toggleAddButtonIcon() {
    addTaskIcon.src = addTaskIcon.src === AddIcon ? AddFilledIcon : AddIcon;
  }

  function clickHandlerAddTaskButton() {
    const newTodo = Todo('');
    const editDialogBox = editDialog(newTodo);
    document.documentElement.appendChild(editDialogBox);
    editDialogBox.showModal();
  }

  pageContainer.append(header(), nav(), main);
})();
//
// const new_todo = Todo(
//   'Read 5 pages',
//   format(new Date(2023, 9, 18), 'yyyy-MMM-dd')
// );
// const new_todo2 = Todo(
//   'Exercise for 30min',
//   format(new Date(2023, 9, 17), 'yyyy-MM-dd'),
//   'high',
//   'Daily',
//   'Interval training on exercise bike',
//   [
//     'read while biking',
//     'increase intensity by 1',
//     'do arm strengthening exercises while biking',
//     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
//   ]
// );
// const new_todo3 = Todo(
//   'Walk the dog',
//   format(new Date(2023, 9, 17), 'yyyy-MM-dd'),
//   'medium',
//   'Daily',
//   'Interval training on exercise bike',
//   ['read while biking', 'do arm strengthening exercises while biking']
// );

// const new_todo7 = Todo(
//   'Read 5 pages',
//   format(new Date(2024, 9, 17), 'yyyy-MM-dd'),
//   'medium',
//   'Daily',
//   'Interval training on exercise bike',
//   ['read while biking', 'do arm strengthening exercises while biking']
// );

// const project = Project('Daily', [new_todo2, new_todo3]);
// const project2 = Project('TestProject', [new_todo, new_todo2]);
// const project3 = Project('Daily', [new_todo, new_todo2]);
// const project4 = Project('Daily', [new_todo, new_todo2]);

// storage.removeProject(3);
// storage.removeTodo(1);
// storage.addProject(project);
// storage.addProject(project3);

// storage.addTodo(new_todo);
// storage.addTodo(new_todo2);
// storage.addTodo(new_todo3);
// storage.addTodo(new_todo7);
