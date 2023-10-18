import format from 'date-fns/format';
import newTodo from './components/newTodo';

const todos = [];
console.log('testing...');
todos.push(newTodo('Read 5 pages', format(new Date(2023, 9, 18), 'MMM-dd')));
todos.push(
  newTodo('Exercise for 30min', format(new Date(2023, 8, 17), 'MMM-dd'))
);
console.log(todos);
