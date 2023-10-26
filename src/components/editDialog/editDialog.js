import './editDialog.css';
import format from 'date-fns/format';
import formComponent from './input';

export default function editDialog(todo) {
  const editDialogBox = document.createElement('dialog');
  const form = document.createElement('form');
  form.classList.add('form');

  const titleFormRow = document.createElement('div');
  const titleComponent = formComponent('input', 'Task name', {
    type: 'text',
    name: 'title',
    id: 'title',
    required: '',
    placeholder: 'Add a task name',
    value: todo.title,
  });
  titleFormRow.classList.add('form-control');
  titleFormRow.append(titleComponent.label, titleComponent.inputField);

  const notesFormRow = document.createElement('div');
  const notesComponent = formComponent('input', 'Notes', {
    type: 'text',
    name: 'notes',
    id: 'notes',
    placeholder: 'Add additional notes',
    value: todo.notes || '',
  });
  notesFormRow.classList.add('form-control');
  notesFormRow.append(notesComponent.label, notesComponent.inputField);

  const dueDateDiv = document.createElement('div');
  const dueDateComponent = formComponent('input', 'Due Date', {
    type: 'date',
    id: 'dueDate',
    name: 'dueDate',
    min: format(new Date(), 'yyyy-MM-dd'),
    value: todo.dueDate || '',
  });
  dueDateDiv.classList.add('form-control');
  dueDateDiv.append(dueDateComponent.label, dueDateComponent.inputField);

  const priorityDiv = document.createElement('div');
  const priorityComponent = formComponent(
    'select',
    'Priority',
    {
      name: 'priority',
      id: 'priority',
    },
    ['low', 'medium', 'high']
  );
  priorityDiv.classList.add('form-control');
  priorityDiv.append(priorityComponent.label, priorityComponent.inputField);

  const projectDiv = document.createElement('div');
  const projectComponent = formComponent(
    'select',
    'Project',
    {
      name: 'project',
      id: 'project',
    },
    ['All', 'Daily', 'Upcoming', 'Test'] //change to projects array when implemented and imported
  );
  projectDiv.classList.add('form-control');
  projectDiv.append(projectComponent.label, projectComponent.inputField);

  const checklistComponent = formComponent('input', 'Checklist', {
    type: 'checkbox',
    id: 'checklist',
    name: 'checklist',
    value: todo.checklist || '',
  });

  form.append(titleFormRow, notesFormRow, dueDateDiv, priorityDiv, projectDiv);
  editDialogBox.append(form);
  return editDialogBox;
}
