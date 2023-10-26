import './checklist.css';
import formComponent from './formControl';
import AddIcon from './add_icon.svg';
import CloseIcon from './close_icon.svg';
import CloseIconRed from './close_icon_red.svg';

export default function checklistComponent(checklist) {
  const fieldset = document.createElement('fieldset');
  const legend = document.createElement('legend');

  legend.textContent = 'Checklist';
  fieldset.appendChild(legend);

  checklist.forEach((item, index) => {
    const deleteButton = document.createElement('button');
    const deleteIcon = document.createElement('img');
    deleteIcon.src = CloseIcon;
    deleteButton.appendChild(deleteIcon);
    const checklistItem = formComponent('textarea', '', {
      type: 'text',
      name: 'checklist',
      id: `item=${index}`,
      value: item,
    });
    checklistItem.prepend(deleteButton);
    fieldset.appendChild(checklistItem);
    deleteButton.addEventListener('mouseover', toggleDeleteButtonImage);
    deleteButton.addEventListener('mouseout', toggleDeleteButtonImage);

    function toggleDeleteButtonImage() {
      deleteIcon.src =
        deleteIcon.src === CloseIconRed ? CloseIcon : CloseIconRed;
    }
  });

  return fieldset;
}
