export default function formComponent(element, heading, attributes, options) {
  const formRow = document.createElement('div');
  const inputField = document.createElement(element);
  const label = document.createElement('label');

  formRow.classList.add('form-row');
  setAttributes(inputField, attributes);
  setAttributes(label, { for: attributes.id });
  label.textContent = heading;
  formRow.append(label, inputField);
  moveCursorToEnd(inputField);

  if (element === 'select' && options) {
    options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;
      inputField.appendChild(optionElement);
    });
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

  return formRow;
}
