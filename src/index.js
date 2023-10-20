import format from 'date-fns/format';
import Todo from './todo';
import Project from './project';
import Storage from './storage';
import todoItem from './components/todoItem/todoItem';

const storage = Storage();
const new_todo = Todo('Read 5 pages', format(new Date(2023, 9, 18), 'MMM-dd'));
const new_todo2 = Todo(
  'Exercise for 30min',
  format(new Date(2023, 9, 17), 'MMM-dd'),
  'high',
  '',
  '',
  ['read', 'new vocab']
);

const container = document.querySelector('#content');
container.appendChild(todoItem(new_todo2));
