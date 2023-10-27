import './checklist.css';
import formComponent from './formControl';
import AddIcon from './add_icon_green.svg';
import CloseIcon from './close_icon.svg';
import CloseIconRed from './close_icon_red.svg';
import Storage from '../../storage';

export default function checklistComponent(todo) {
  const fieldset = document.createElement('fieldset');
  const legend = document.createElement('legend');
  const addButton = document.createElement('button');
  const addIcon = document.createElement('img');
  let checklistItemId = 0;

  addIcon.src = AddIcon;
  addButton.textContent = 'Add item';
  addButton.setAttribute('id', 'add-btn');
  addButton.prepend(addIcon);
  legend.textContent = 'Checklist';
  fieldset.appendChild(legend);

  todo.checklist.forEach((item) => {
    fieldset.append(checklistItemContainer(item));
  });
  fieldset.append(addButton);
  addButton.addEventListener('click', (ev) => clickHandlerAdd(ev));

  const buttonContainer = document.createElement('div');
  const cancelButton = document.createElement('button');
  const saveButton = document.createElement('button');
  buttonContainer.classList.add('submit-btns');
  cancelButton.setAttribute('id', 'cancel-btn');
  cancelButton.setAttribute('formmethod', 'dialog');
  cancelButton.textContent = 'Cancel';
  cancelButton.value = 'cancel';
  saveButton.setAttribute('id', 'save-btn');
  saveButton.setAttribute('type', 'submit');
  saveButton.textContent = 'Save';
  buttonContainer.append(cancelButton, saveButton);
  fieldset.appendChild(buttonContainer);

  function checklistItemContainer(checklistItem = null) {
    const itemContainer = document.createElement('div');
    const deleteButton = document.createElement('button');
    const deleteIcon = document.createElement('img');
    const textAreaInput = document.createElement('textarea');
    const label = document.createElement('label');

    itemContainer.setAttribute('id', `item-${++checklistItemId}`);
    itemContainer.classList.add('form-control', 'checklist-item');
    label.setAttribute('for', `item-${++checklistItemId}`);
    textAreaInput.setAttribute('id', `item-${checklistItemId}`);
    textAreaInput.setAttribute('name', 'checklist');
    textAreaInput.required = true;
    textAreaInput.textContent = checklistItem;
    deleteIcon.src = CloseIcon;
    deleteButton.classList.add('delete-btn');
    deleteButton.appendChild(deleteIcon);

    itemContainer.append(deleteButton, label, textAreaInput);
    fieldset.appendChild(itemContainer);
    deleteButton.addEventListener('mouseover', toggleDeleteButtonImage);
    deleteButton.addEventListener('mouseout', toggleDeleteButtonImage);
    deleteButton.addEventListener('input', resizeTextarea);
    deleteButton.addEventListener('click', (ev) => clickHandlerDelete(ev));

    function toggleDeleteButtonImage() {
      deleteIcon.src =
        deleteIcon.src === CloseIconRed ? CloseIcon : CloseIconRed;
    }

    function clickHandlerDelete(ev) {
      ev.preventDefault();
      fieldset.removeChild(itemContainer);
    }

    function resizeTextarea() {
      this.style.height = '1px';
      this.style.height = 25 + this.scrollHeight + 'px';
    }
    return itemContainer;
  }

  function clickHandlerAdd(ev) {
    ev.preventDefault();
    fieldset.insertBefore(checklistItemContainer(), addButton);
  }

  return fieldset;
}
