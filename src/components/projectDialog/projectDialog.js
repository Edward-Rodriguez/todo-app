/* eslint-disable no-use-before-define */
import Storage from '../../storage';
import formComponent from '../formControl/formControl';
import fillIcons from '../nav/fillIcons';
import Project from '../../project';
import './projectDialog.css';

export default function projectDialog() {
  const storage = Storage();
  const projectDialogBox = document.createElement('dialog');
  const form = document.createElement('form');

  form.classList.add('project-form');
  form.setAttribute('method', 'dialog');
  projectDialogBox.classList.add('project-dialog');

  const heading = document.createElement('h1');
  heading.textContent = 'Add Project';

  const titleComponent = formComponent('input', 'Name', {
    type: 'text',
    name: 'project-title',
    id: 'project-title',
    required: '',
    placeholder: 'Enter a project name',
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
  selectedColor.src = fillIcons.gray;
  selectedColorName.textContent = 'Gray';
  dropdownButton.setAttribute('type', 'button');
  dropdownButton.append(selectedColor, selectedColorName);

  Object.entries(fillIcons).forEach(([key, value]) => {
    const listItem = document.createElement('li');
    const color = document.createElement('img');
    const colorName = document.createElement('span');
    color.src = value;
    colorName.textContent = capitalize(key);
    listItem.append(color, colorName);
    colorList.appendChild(listItem);
    listItem.addEventListener('click', clickHandlerColorList);
  });

  dropdown.append(colorHeading, dropdownButton, colorList);
  dropdownButton.addEventListener('click', clickHandlerColorButton);

  // cancel & save buttons
  const cancelButton = document.createElement('button');
  const saveButton = document.createElement('button');
  const buttonFormRow = document.createElement('div');
  buttonFormRow.classList.add('submit-btns', 'form-row');
  cancelButton.setAttribute('id', 'cancel-btn');
  cancelButton.setAttribute('formmethod', 'dialog');
  cancelButton.textContent = 'Cancel';
  cancelButton.value = 'cancel';
  saveButton.setAttribute('id', 'save-btn');
  saveButton.setAttribute('type', 'submit');
  saveButton.textContent = 'Save';
  buttonFormRow.append(cancelButton, saveButton);
  //   saveButton.addEventListener('click', onSubmit);
  //   cancelButton.addEventListener('click', clickHandlerCancel);

  form.append(titleComponent.formRow, dropdown, buttonFormRow);
  projectDialogBox.addEventListener('click', clickHandlerDropdown);
  projectDialogBox.append(heading, form);
  cancelButton.addEventListener('click', clickHandlerCancel);
  saveButton.addEventListener('click', onSubmit);

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

  function onSubmit() {
    const newProject = Project((storage.maxProjectId += 1));
    const inputTitle = titleComponent.inputField.value;
    if (inputTitle) {
      newProject.title = inputTitle;
      newProject.color = selectedColorName.textContent.toLowerCase();
      newProject.todos = [];
      storage.addProject(newProject);
      projectDialogBox.close();
    }
  }

  function clickHandlerCancel(ev) {
    ev.preventDefault();
    projectDialogBox.close();
  }

  return projectDialogBox;
}
