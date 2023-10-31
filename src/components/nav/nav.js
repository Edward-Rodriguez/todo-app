import menuLink from './menu-link';
import { format, isAfter } from 'date-fns';
import Storage from '../../storage';
import CalendarTodayIcon from './calendar_today_icon.svg';
import CalendarIcon from './calendar_month_icon.svg';
import CalendarUpcomingIcon from './event_upcoming_icon.svg';
import CloseIconRed from '../../assets/img/close_icon_red.svg';
import RedDotIcon from './reddish_fill.svg';
import GreenDotIcon from './reddish_fill.svg';
import PurpleDotcon from './reddish_fill.svg';
import TurquoiseDotIcon from './reddish_fill.svg';
import './nav.css';

export const nav = () => {
  const storage = Storage();
  const nav = document.createElement('nav');

  const allLink = menuLink('All', storage.todos.length, CalendarIcon);
  const todayLink = menuLink(
    'Today',
    storage.todos.filter(
      (todo) => todo.dueDate === format(new Date(), 'yyyy-mm-dd')
    ).length,
    CalendarTodayIcon
  );
  const upcomingLink = menuLink(
    'Upcoming',
    storage.todos.filter((todo) => isAfter(new Date(todo.dueDate), new Date()))
      .length,
    CalendarUpcomingIcon
  );
  nav.setAttribute('id', 'sidebar-menu');
  nav.append(allLink, todayLink, upcomingLink);

  // projects section
  const projectsContainer = document.createElement('div');
  const projectsHeader = document.createElement('header');
  const heading = document.createElement('h1');
  const fillIcons = [RedDotIcon, GreenDotIcon, PurpleDotcon, TurquoiseDotIcon];

  projectsContainer.setAttribute('id', 'projects-container');
  heading.textContent = 'Projects';
  projectsHeader.appendChild(heading);
  projectsContainer.append(projectsHeader);
  storage.projects.forEach((project) => {
    const projectMenuLink = menuLink(
      project.title,
      storage.projects.filter((proj) => proj.id === project.id).length,
      randomFillPicker()
    );
    const deleteIcon = document.createElement('img');
    deleteIcon.src = CloseIconRed;
    deleteIcon.classList.add('project-delete-icon');
    projectMenuLink.prepend(deleteIcon);
    projectsContainer.appendChild(projectMenuLink);
  });

  function randomFillPicker() {
    const randomIndex = Math.floor(Math.random() * fillIcons.length);
    return fillIcons[randomIndex];
  }

  nav.appendChild(projectsContainer);

  return nav;
};