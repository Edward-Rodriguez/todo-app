import './editDialog.css';
import format from 'date-fns/format';
import formComponent from './input';

export default function editDialog(todo) {
  const editDialogBox = document.createElement('dialog');
  const form = document.createElement('form');
  form.classList.add('form');

  const titleComponent = formComponent('Task name', {
    type: 'text',
    name: 'title',
    id: 'title',
    required: '',
    placeholder: 'Add a task name',
    value: todo.title,
  });

  const notesComponent = formComponent('Notes', {
    type: 'text',
    name: 'notes',
    id: 'notes',
    placeholder: 'Add additional notes',
    value: todo.notes || '',
  });

  //due Date
  const dueDateFormRow = document.createElement('div');
  const dateField = document.createElement('input');
  const dateLabel = document.createElement('label');
  setAttributes(dateField, {
    type: 'date',
    id: 'dueDate',
    name: 'dueDate',
    min: format(new Date(), 'yyyy-MM-dd'),
  });
  if (todo.dueDate) dateField.value = todo.dueDate;
  dueDateFormRow.classList.add('form-row');
  dateLabel.textContent = 'Due Date';
  setAttributes(dateLabel, { for: 'dueDate' });
  dueDateFormRow.append(dateLabel, dateField);

  const dueDateComponent = formComponent('Due Date', {
    type: 'date',
    id: 'dueDate',
    name: 'dueDate',
    min: format(new Date(), 'yyyy-MM-dd'),
    value: todo.dueDate || '',
  });

  // prioriity
  // const priorityFormRow = document.createElement();

  function setAttributes(elem, attrs) {
    Object.entries(attrs).forEach((entry) => {
      const [key, value] = entry;
      elem.setAttribute(key, value);
    });
  }

  form.append(titleComponent, notesComponent, dueDateComponent);
  editDialogBox.append(form);
  return editDialogBox;
}
