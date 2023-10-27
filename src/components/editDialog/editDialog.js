import './editDialog.css';
import format from 'date-fns/format';
import formComponent from './formControl';
import checklistComponent from './checklist';

export default function editDialog(todo) {
  const editDialogBox = document.createElement('dialog');
  const form = document.createElement('form');
  form.classList.add('form');

  const titleComponent = formComponent('input', 'Task name', {
    type: 'text',
    name: 'title',
    id: 'title',
    required: '',
    placeholder: 'Add a task name',
    value: todo.title,
  });
  titleComponent.classList.add('form-row');

  const notesComponent = formComponent('input', 'Notes', {
    type: 'text',
    name: 'notes',
    id: 'notes',
    placeholder: 'Add additional notes',
    value: todo.notes || '',
  });
  notesComponent.classList.add('form-row');

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
    ['Low', 'Medium', 'High']
  );

  const projectComponent = formComponent(
    'select',
    'Project',
    {
      name: 'project',
      id: 'project',
    },
    ['All', 'Daily', 'Upcoming', 'Test'] //change to projects array when implemented and imported
  );

  const selectionFormRow = document.createElement('div');
  selectionFormRow.classList.add('form-row', 'selection-container');
  selectionFormRow.append(
    dueDateComponent,
    priorityComponent,
    projectComponent
  );

  const checklist = checklistComponent(todo);

  form.append(titleComponent, notesComponent, selectionFormRow, checklist);
  editDialogBox.append(form);
  return editDialogBox;
}
