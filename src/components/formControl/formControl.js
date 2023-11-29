/* eslint-disable no-use-before-define */
export default function formComponent(
  element,
  heading,
  attributes,
  options,
  defaultProject,
) {
  const formRow = document.createElement('div');
  const inputField = document.createElement(element);
  const label = document.createElement('label');

  formRow.classList.add('form-control');
  setAttributes(inputField, attributes);
  setAttributes(label, { for: attributes.id });
  label.textContent = heading;
  formRow.append(label, inputField);
  moveCursorToEnd(inputField);

  if (element === 'select' && options) {
    options.forEach((option) => {
      const optionElement = document.createElement('option');
      if (attributes.id === 'project') {
        optionElement.textContent = option.title;
        optionElement.value = option.id;
        if (defaultProject && defaultProject === option.title)
          optionElement.setAttribute('selected', '');
      } else {
        optionElement.value = option;
        optionElement.textContent = option;
      }
      inputField.appendChild(optionElement);
    });
    if (attributes.id === 'project') {
      const noneOption = document.createElement('option');
      noneOption.textContent = 'None';
      noneOption.classList.add('none-option');
      inputField.prepend(noneOption);
      if (!defaultProject) noneOption.setAttribute('selected', '');
    }
  }

  function setAttributes(elem, attrs) {
    Object.entries(attrs).forEach((entry) => {
      const [key, value] = entry;
      elem.setAttribute(key, value);
    });
  }

  function moveCursorToEnd(elem) {
    if (elem.type === 'text') {
      const end = inputField.value.length;
      elem.setSelectionRange(end, end);
    }
  }

  return { formRow, inputField };
}
