import format from 'date-fns/format';
import newTodo from './components/newTodo';
import local_storage from './components/storage';

const storage = local_storage();
const new_todo = newTodo(
  'Read 5 pages',
  format(new Date(2023, 9, 18), 'MMM-dd')
);
const new_todo2 = newTodo(
  'Exercise for 30min',
  format(new Date(2023, 9, 17), 'MMM-dd')
);

storage.addTodo(new_todo);
storage.addTodo(new_todo2);
console.log(storage.getTodos());
storage.removeTodo(new_todo2.id);
console.log(storage.getTodos());
