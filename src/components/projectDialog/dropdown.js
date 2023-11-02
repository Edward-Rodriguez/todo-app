import RedDotIcon from './reddish_fill.svg';
import GreenDotIcon from './greenish_fill.svg';
import PurpleDotcon from './purple_fill.svg';
import TurquoiseDotIcon from './base_fill.svg';

export default function dropdown() {
  const dropdown = document.createElement('div');
  const dropdownButton = document.createElement('button');
  const list = document.createElement('ul');
  for (const [key, value] of Object.entries(fillIcons)) {
    const listItem = document.createElement('li');
    const icon = document.createElement('img');
    icon.src = value;
    listItem.value = key;
    listItem.textContent = key;
    listItem.prepend(icon);
    list.appendChild(listItem);
  }

  dropdownButton.textContent = 'Color';
  dropdown.setAttribute('id', 'dropdown');
  dropdown.append(dropdownButton, list);
}
