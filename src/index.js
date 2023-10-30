import format from 'date-fns/format';
import Todo from './todo';
import Project from './project';
import Storage from './storage';
import todoComponent from './components/todoContainer/todoContainer';
import './index.css';

const storage = Storage();
const new_todo = Todo(
  'Read 5 pages',
  format(new Date(2023, 9, 18), 'yyyy-MMM-dd')
);
const new_todo2 = Todo(
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
const new_todo3 = Todo(
  'Walk the dog',
  format(new Date(2023, 9, 17), 'yyyy-MM-dd'),
  'medium',
  'Daily',
  'Interval training on exercise bike',
  ['read while biking', 'do arm strengthening exercises while biking']
);

const project = Project('Daily', [new_todo2, new_todo3]);
const project2 = Project('TestProject', [new_todo, new_todo2]);

// storage.removeProject(1);
// storage.removeProject(2);
// storage.addProject(project);
// storage.addProject(project2);

// storage.addTodo(new_todo);
// storage.addTodo(new_todo2);
// storage.addTodo(new_todo3);

const container = document.querySelector('#content');
storage.todos.forEach((todo) => {
  container.appendChild(todoComponent(todo));
});
