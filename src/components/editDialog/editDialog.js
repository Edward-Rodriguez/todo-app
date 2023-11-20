/* eslint-disable no-use-before-define */
import './editDialog.css';
import format from 'date-fns/format';
import formComponent from '../formControl/formControl';
import checklistComponent from './checklist';
import Storage from '../../storage';

export default function editDialog(todo) {
  const storage = Storage();
  const editDialogBox = document.createElement('dialog');
  const form = document.createElement('form');
  form.classList.add('form');
  form.setAttribute('method', 'dialog');

  const titleComponent = formComponent('input', 'Task name', {
    type: 'text',
    name: 'title',
    id: 'title',
    required: '',
    placeholder: 'Add a task name',
    value: todo.title,
  });
  titleComponent.formRow.classList.add('form-row');

  const notesComponent = formComponent('input', 'Notes', {
    type: 'text',
    name: 'notes',
    id: 'notes',
    placeholder: 'Add additional notes',
    value: todo.notes || '',
  });
  notesComponent.formRow.classList.add('form-row');

  const dueDateComponent = formComponent('input', 'Due Date', {
    type: 'date',
    id: 'dueDate',
    name: 'dueDate',
    min: format(new Date(), 'yyyy-MM-dd'),
    value: todo.dueDate || '',
  });

  const priorityComponent = formComponent(
    'select',
    'Priority',
    {
      name: 'priority',
      id: 'priority',
    },
    ['Low', 'Medium', 'High'],
  );

  const projTitle = todo.projectId
    ? storage.projects.find((proj) => proj.id === todo.projectId).title
    : null;
  const projectComponent = formComponent(
    'select',
    'Project',
    {
      name: 'project',
      id: 'project',
    },
    storage.projects,
    projTitle,
  );

  const selectionFormRow = document.createElement('div');
  selectionFormRow.classList.add('form-row', 'selection-container');
  selectionFormRow.append(
    dueDateComponent.formRow,
    priorityComponent.formRow,
    projectComponent.formRow,
  );

  const checklistDiv = checklistComponent(todo);
  const buttonFormRow = document.createElement('div');
  const cancelButton = document.createElement('button');
  const saveButton = document.createElement('button');
  buttonFormRow.classList.add('submit-btns', 'form-row');
  cancelButton.setAttribute('id', 'cancel-btn');
  cancelButton.setAttribute('formmethod', 'dialog');
  cancelButton.textContent = 'Cancel';
  cancelButton.value = 'cancel';
  saveButton.setAttribute('id', 'save-btn');
  saveButton.setAttribute('type', 'submit');
  saveButton.textContent = 'Save';
  buttonFormRow.append(cancelButton, saveButton);
  saveButton.addEventListener('click', onSubmit);
  cancelButton.addEventListener('click', clickHandlerCancel);

  function onSubmit() {
    todo.title = titleComponent.inputField.value;
    todo.notes = notesComponent.inputField.value;
    todo.dueDate = dueDateComponent.inputField.value;
    todo.priority = priorityComponent.inputField.value.toLowerCase();
    todo.projectId = +projectComponent.inputField.value || null;
    const checklist = [];
    Array.from(checklistDiv.children).forEach((child) => {
      const textarea = child.querySelector("textarea[name='checklist'");
      textarea ? checklist.push(textarea.value) : '';
    });
    todo.checklist = checklist;
    updateLocalStorage(todo);
  }

  function clickHandlerCancel(ev) {
    ev.preventDefault();
    editDialogBox.close();
  }

  function updateLocalStorage(todo) {
    storage.todos.find((existingTodo) => existingTodo.id === todo.id)
      ? storage.updateTodo(todo.id, todo)
      : storage.addTodo(todo);
  }

  form.append(
    titleComponent.formRow,
    notesComponent.formRow,
    selectionFormRow,
    checklistDiv,
    buttonFormRow,
  );
  editDialogBox.append(form);
  return editDialogBox;
}
