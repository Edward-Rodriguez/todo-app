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
  dueDate.textContent = todo.dueDate;
  dropdownImage.src = DropdownIcon;
  deleteImage.src = DeleteIcon;

  dropdownButton.appendChild(dropdownImage);
  deleteButton.appendChild(deleteImage);
  todoDiv.append(
    checkBox,
    titleLabel,
    dueDate,
    dropdownButton,
    deleteButton,
    dropdownContent(todo)
  );

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

  dropdownContainer.classList.add('dropdown');
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
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    //   const label
  });
  return checklistContainer;
}
