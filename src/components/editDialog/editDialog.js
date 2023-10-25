import './editDialog.css';
import format from 'date-fns/format';
import formComponent from './input';

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

  const notesComponent = formComponent('input', 'Notes', {
    type: 'text',
    name: 'notes',
    id: 'notes',
    placeholder: 'Add additional notes',
    value: todo.notes || '',
  });

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
    ['low', 'medium', 'high']
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

  // const checklistComponent = formComponent('input', 'Checklist', {
  //   type: 'checkbox',
  //   id: 'checklist',
  //   name: 'checklist',
  //   value: todo.checklist || '',
  // });

  form.append(
    titleComponent,
    notesComponent,
    dueDateComponent,
    priorityComponent,
    projectComponent
  );
  editDialogBox.append(form);
  return editDialogBox;
}
