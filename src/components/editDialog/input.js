export default function formComponent(heading, attributes) {
  const formRow = document.createElement('div');
  const inputField = document.createElement('input');
  const label = document.createElement('label');

  formRow.classList.add('form-row');
  setAttributes(inputField, attributes);
  setAttributes(label, { for: attributes.id });
  label.textContent = heading;
  formRow.append(label, inputField);
  moveCursorToEnd(inputField);

  function setAttributes(elem, attrs) {
    Object.entries(attrs).forEach((entry) => {
      const [key, value] = entry;
      elem.setAttribute(key, value);
    });
  }

  function moveCursorToEnd(elem) {
    if (!elem.type.includes('date')) {
      const end = inputField.value.length;
      elem.setSelectionRange(end, end);
    }
  }

  return formRow;
}
