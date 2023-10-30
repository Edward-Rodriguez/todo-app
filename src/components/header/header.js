import Logo from './logo.svg';
import './header.css';

export const header = () => {
  const header = document.createElement('header');
  const logo = document.createElement('img');
  const appName = 'ToDo';

  header.setAttribute('id', 'header');
  logo.src = Logo;
  header.append(logo, appName);

  return header;
};
