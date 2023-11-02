import Storage from '../../storage';
import formComponent from '../formControl/formControl';
import RedDotIcon from './reddish_fill.svg';
import GreenDotIcon from './greenish_fill.svg';
import PurpleDotcon from './purple_fill.svg';
import TurquoiseDotIcon from './base_fill.svg';
import GrayDotIcon from './gray_fill.svg';
import './projectDialog.css';

export default function projectDialog() {
  const storage = Storage();
  const projectDialogBox = document.createElement('dialog');
  const form = document.createElement('form');
  const fillIcons = {
    gray: GrayDotIcon,
    red: RedDotIcon,
    green: GreenDotIcon,
    purple: PurpleDotcon,
    turquoise: TurquoiseDotIcon,
  };
  form.classList.add('project-form');
  form.setAttribute('method', 'dialog');
  projectDialogBox.classList.add('project-dialog');

  const heading = document.createElement('h1');
  heading.textContent = 'Add Project';

  const titleComponent = formComponent('input', 'Project name', {
    type: 'text',
    name: 'project-title',
    id: 'project-title',
    required: true,
    placeholder: 'Add a project name',
  });
  titleComponent.formRow.classList.add('form-row');

  // color picker
  const colorHeading = document.createElement('label');
  const dropdown = document.createElement('div');
  const dropdownButton = document.createElement('button');
  const selectedColor = document.createElement('img');
  const selectedColorName = document.createElement('span');
  const colorList = document.createElement('ul');
  colorList.classList.add('collapse');
  colorList.setAttribute('id', 'color-list');
  dropdown.setAttribute('id', 'dropdown');
  colorHeading.setAttribute('for', 'dropdown');
  colorHeading.textContent = 'Color';
  selectedColor.src = GrayDotIcon;
  selectedColorName.textContent = 'Gray';
  dropdownButton.setAttribute('type', 'button');
  dropdownButton.append(selectedColor, selectedColorName);

  for (const [key, value] of Object.entries(fillIcons)) {
    const listItem = document.createElement('li');
    const color = document.createElement('img');
    const colorName = document.createElement('span');
    color.src = value;
    colorName.textContent = capitalize(key);
    listItem.append(color, colorName);
    colorList.appendChild(listItem);
    listItem.addEventListener('click', clickHandlerColorList);
  }

  dropdown.append(colorHeading, dropdownButton, colorList);
  dropdownButton.addEventListener('click', clickHandlerColorButton);
  form.append(titleComponent.formRow, dropdown);
  projectDialogBox.addEventListener('click', clickHandlerDropdown);
  projectDialogBox.append(heading, form);

  function capitalize(word) {
    return word[0].toUpperCase() + word.substring(1);
  }

  function clickHandlerColorButton() {
    colorList.classList.toggle('expanded');
  }

  function clickHandlerColorList(ev) {
    const parentListItem = ev.target.closest('li');
    const newColor = parentListItem.querySelector('img').src;
    const newColorName = parentListItem.querySelector('span').textContent;
    selectedColor.src = newColor;
    selectedColorName.textContent = newColorName;
    colorList.classList.toggle('expanded');
  }

  function clickHandlerDropdown(ev) {
    if (
      colorList.classList.contains('expanded') &&
      !ev.target.closest('#color-list') &&
      !ev.target.closest('button')
    ) {
      colorList.classList.toggle('expanded');
    }
  }

  return projectDialogBox;
}
