import DropdownIcon from './drop-down-icon.svg';
import DropUpIcon from './drop-up-icon.svg';
import DeleteIcon from './delete-icon.svg';
import EditIcon from './edit-icon.svg';
import './todoItem.css';

export default function todoItem(todo) {
  const todoDiv = document.createElement('div');
  const checkBox = document.createElement('input');
  const titleLabel = document.createElement('label');
  const dueDate = document.createElement('div');
  const buttonContainer = document.createElement('div');
  const dropdownButton = document.createElement('button');
  const dropdownImage = document.createElement('img');
  const deleteButton = document.createElement('button');
  const deleteImage = document.createElement('img');

  todoDiv.classList.add('todo-container');
  todoDiv.dataset.todoId = todo.id;
  checkBox.setAttribute('type', 'checkbox');
  checkBox.setAttribute('id', todo.id);
  titleLabel.setAttribute('for', todo.id);
  titleLabel.textContent = todo.title;
  dueDate.classList.add('due-date');
  dueDate.textContent = todo.dueDate;
  buttonContainer.classList.add('button-container');
  dropdownImage.classList.add('dropdown-img');
  dropdownImage.src = DropdownIcon;
  deleteImage.src = DeleteIcon;

  buttonContainer.append(dropdownButton, deleteButton);
  dropdownButton.appendChild(dropdownImage);
  deleteButton.appendChild(deleteImage);
  todoDiv.append(
    checkBox,
    titleLabel,
    dueDate,
    buttonContainer,
    dropdownContent(todo)
  );

  dropdownButton.addEventListener('click', clickHandlerDropdown);
  return todoDiv;
}

function dropdownContent(todo) {
  const dropdownContainer = document.createElement('div');
  const project = document.createElement('div');
  const priority = document.createElement('div');
  const editButton = document.createElement('button');
  const editImage = document.createElement('img');
  const notes = document.createElement('p');
  const checklist = checklistContent(todo.checklist);

  dropdownContainer.classList.add('dropdown', 'hidden');
  project.classList.add('project');
  project.textContent = todo.project;
  priority.classList.add('priority');
  priority.textContent = `Priority: ${todo.priority}`;
  editImage.src = EditIcon;
  notes.classList.add('notes');
  notes.textContent = todo.notes;
  checklist.classList.add('checklist');

  editButton.appendChild(editImage);
  dropdownContainer.append(project, priority, editButton, notes, checklist);

  return dropdownContainer;
}

function checklistContent(checklist) {
  const checklistContainer = document.createElement('div');

  checklist.forEach((item, index) => {
    const itemContainer = document.createElement('div');
    const checkbox = document.createElement('input');
    const label = document.createElement('label');

    itemContainer.classList.add('checklist-item');
    itemContainer.setAttribute('id', index);
    checkbox.setAttribute('type', 'checkbox');
    label.textContent = item;
    itemContainer.append(checkbox, label);
    checklistContainer.appendChild(itemContainer);
  });
  return checklistContainer;
}

function clickHandlerDropdown(ev) {
  const todoContainer = ev.target.closest('[data-todo-id]'); // parent container
  const dropdown = todoContainer.querySelector('.dropdown');
  const dropdownIcon = todoContainer.querySelector('.dropdown-img');

  if (dropdown.classList.contains('hidden')) {
    dropdown.classList.remove('hidden');
    dropdownIcon.src = DropUpIcon;
  } else {
    dropdown.classList.add('hidden');
    dropdownIcon.src = DropdownIcon;
  }
}

function clickHandlerDelete() {}

function clickHandlerEdit() {}
