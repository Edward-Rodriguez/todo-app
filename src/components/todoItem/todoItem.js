import DropdownIcon from './drop-down-icon.svg';
import DropUpIcon from './drop-up-icon.svg';
import DeleteIcon from './delete-icon.svg';
import './todoItem.css';

export default function todoItem(todo) {
  const todoDiv = document.createElement('div');
  const checkBox = document.createElement('input');
  const titleLabel = document.createElement('label');
  const dueDate = document.createElement('div');
  const dropdownIcon = document.createElement('img');
  const deleteButton = document.createElement('img');

  todoDiv.classList.add('todo-container');
  todoDiv.dataset.todoId = todo.id;
  checkBox.setAttribute('type', 'checkbox');
  checkBox.setAttribute('id', todo.id);
  titleLabel.setAttribute('for', todo.id);
  titleLabel.textContent = todo.title;
  dueDate.textContent = todo.dueDate;
  dropdownIcon.src = DropdownIcon;
  deleteButton.src = DeleteIcon;

  todoDiv.append(checkBox, titleLabel, dueDate, dropdownIcon, deleteButton);

  return todoDiv;
}
