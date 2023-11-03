import DropdownIcon from './drop-down-icon.svg';
import DropUpIcon from './drop-up-icon.svg';
import DeleteIcon from './delete-icon.svg';
import EditIcon from './edit-icon.svg';
import Storage from '../../storage';
import './todoContainer.css';
import editDialog from '../editDialog/editDialog';

export default function todoContainer(todo) {
  let todoDiv = document.createElement('div');
  const checkBox = document.createElement('input');
  const titleLabel = document.createElement('label');
  const titleSpan = document.createElement('span');
  const dueDate = document.createElement('div');
  const buttonContainer = document.createElement('div');
  const dropdownButton = document.createElement('button');
  const dropdownImage = document.createElement('img');
  const deleteButton = document.createElement('button');
  const deleteImage = document.createElement('img');

  todoDiv.classList.add('todo-container');
  todoDiv.dataset.todoId = todo.id;
  checkBox.setAttribute('type', 'checkbox');
  checkBox.classList.add(todo.priority);
  titleSpan.textContent = todo.title;
  dueDate.classList.add('due-date');
  dueDate.textContent = todo.dueDate;
  buttonContainer.classList.add('button-container');
  dropdownImage.classList.add('dropdown-img');
  dropdownImage.src = DropdownIcon;
  deleteImage.src = DeleteIcon;

  titleLabel.prepend(checkBox);
  titleLabel.append(titleSpan);
  buttonContainer.append(dropdownButton, deleteButton);
  dropdownButton.appendChild(dropdownImage);
  deleteButton.appendChild(deleteImage);
  todoDiv.append(titleLabel, dueDate, buttonContainer, dropdownContainer(todo));

  function dropdownContainer() {
    const dropdownContainer = document.createElement('div');
    const project = document.createElement('div');
    const priority = document.createElement('div');
    const editButton = document.createElement('button');
    const editImage = document.createElement('img');
    const notes = document.createElement('p');
    const checklist = checklistContainer();

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

    function checklistContainer() {
      const checklistContainer = document.createElement('div');

      todo.checklist.forEach((item, index) => {
        const itemContainer = document.createElement('div');
        const checkbox = document.createElement('input');
        const label = document.createElement('label');
        const span = document.createElement('span');

        itemContainer.classList.add('checklist-item');
        itemContainer.setAttribute('id', index);
        checkbox.setAttribute('type', 'checkbox');
        // checkbox.style.borderColor = `var(--priority-${todo.priority}-color)`;
        span.textContent = item;
        label.prepend(checkbox);
        label.append(span);
        itemContainer.appendChild(label);
        checklistContainer.appendChild(itemContainer);
      });
      return checklistContainer;
    }

    function clickHandlerEdit() {
      const editDialogBox = editDialog(todo);
      document.documentElement.appendChild(editDialogBox);
      editDialogBox.showModal();
      editDialogBox.addEventListener('close', () => {
        reloadTodo();
      });
    }

    function reloadTodo() {
      todoDiv.textContent = '';
      const updatedTodo = Storage().todos.find(
        (updatedTodo) => updatedTodo.id === todo.id
      );
      todoDiv.parentElement.replaceChild(todoContainer(updatedTodo), todoDiv);
    }

    editButton.addEventListener('click', clickHandlerEdit);
    return dropdownContainer;
  }

  function clickHandlerDropdown() {
    const dropdown = todoDiv.querySelector('.dropdown');
    const dropdownIcon = todoDiv.querySelector('.dropdown-img');

    if (dropdown.classList.contains('hidden')) {
      dropdown.classList.remove('hidden');
      dropdownIcon.src = DropUpIcon;
    } else {
      dropdown.classList.add('hidden');
      dropdownIcon.src = DropdownIcon;
    }
  }

  function clickHandlerDelete() {
    todoDiv.parentElement.removeChild(todoDiv);
    const storage = Storage();
    storage.removeTodo(todo.id);
  }

  dropdownButton.addEventListener('click', clickHandlerDropdown);
  deleteButton.addEventListener('click', clickHandlerDelete);

  return todoDiv;
}
