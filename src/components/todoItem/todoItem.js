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

  todoDiv.append(
    checkBox,
    titleLabel,
    dueDate,
    dropdownIcon,
    deleteButton,
    dropdownContent(todo)
  );

  return todoDiv;
}

function dropdownContent(todo) {
  const dropdownContainer = document.createElement('div');
  const project = document.createElement('div');
  const priority = document.createElement('div');
  const editButton = document.createElement('img');
  const notes = document.createElement('p');
  const checklist = checklistContent(todo.checklist);

  dropdownContainer.classList.add('dropdown');
  project.classList.add('project');
  project.textContent = todo.project;
  priority.classList.add('priority');
  priority.textContent = `Priority: ${todo.priority}`;
  editButton.src = EditIcon;
  notes.classList.add('notes');
  notes.textContent = todo.notes;
  checklist.classList.add('checklist');

  dropdownContainer.append(project, priority, editButton, notes, checklist);

  return dropdownContainer;
}
