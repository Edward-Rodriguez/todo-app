/* eslint-disable no-use-before-define */
import { format, isAfter } from 'date-fns';
import menuLink from './menu-link';
import Storage from '../../storage';
import CalendarTodayIcon from './calendar_today_icon.svg';
import CalendarIcon from './calendar_month_icon.svg';
import CalendarUpcomingIcon from './event_upcoming_icon.svg';
import CloseIconRed from '../../assets/img/close_icon_red.svg';
import AddIconGreen from '../../assets/img/add_icon_green.svg';
import projectDialog from '../projectDialog/projectDialog';
import fillIcons from './fillIcons';
import './nav.css';

export default function navigation() {
  const storage = Storage();
  const nav = document.createElement('nav');

  const allLink = menuLink('All', storage.todos.length, CalendarIcon);
  const todayLink = menuLink(
    'Today',
    storage.todos.filter(
      (todo) => todo.dueDate === format(new Date(), 'yyyy-mm-dd'),
    ).length,
    CalendarTodayIcon,
  );
  const upcomingLink = menuLink(
    'Upcoming',
    storage.todos.filter((todo) => isAfter(new Date(todo.dueDate), new Date()))
      .length,
    CalendarUpcomingIcon,
  );
  nav.setAttribute('id', 'sidebar-menu');
  nav.append(allLink, todayLink, upcomingLink);

  // projects section
  const projectsContainer = document.createElement('div');
  const projectsHeader = document.createElement('header');
  const heading = document.createElement('h1');
  const addProjectButton = document.createElement('button');
  const addButtonIcon = document.createElement('img');

  projectsContainer.setAttribute('id', 'projects-container');
  projectsHeader.setAttribute('id', 'project-header');
  heading.textContent = 'Projects';
  addButtonIcon.src = AddIconGreen;
  addButtonIcon.setAttribute('id', 'proj-add-icon');
  addProjectButton.appendChild(addButtonIcon);
  projectsHeader.append(heading, addProjectButton);
  projectsContainer.append(projectsHeader);

  addProjectButton.addEventListener('click', clickHandlerAddProject);
  refreshProjectList();

  function refreshProjectList() {
    while (projectsContainer.children.length > 1) {
      projectsContainer.removeChild(projectsContainer.lastChild);
    }

    storage.projects.forEach((project) => {
      const projectTodoCount = storage.todos.filter(
        (todo) => todo.project === project.title,
      ).length;
      const projectMenuLink = menuLink(
        project.title,
        projectTodoCount,
        fillIcons[project.color],
      );
      const deleteIcon = document.createElement('img');

      deleteIcon.classList.add('project-delete-icon');
      deleteIcon.src = CloseIconRed;
      projectMenuLink.dataset.projectId = project.id;
      projectMenuLink.prepend(deleteIcon);
      projectsContainer.appendChild(projectMenuLink);
      deleteIcon.addEventListener('click', (ev) => clickHandlerDelete(ev));
    });
  }

  function clickHandlerDelete(ev) {
    const menuItemToRemove = ev.target.closest('.menu-item');
    const projectIdToRemove = menuItemToRemove.dataset.projectId;
    const projectToRemove = storage.projects.find(
      (proj) => proj.id === +projectIdToRemove,
    );
    projectsContainer.removeChild(menuItemToRemove);
    storage.removeProject(projectIdToRemove);

    // remove all associated todo's from storage
    storage.todos = storage.todos.filter(
      (todo) => todo.project !== projectToRemove.title,
    );
  }

  function clickHandlerAddProject() {
    const projectDialogBox = projectDialog();
    document.documentElement.appendChild(projectDialogBox);
    projectDialogBox.showModal();
    projectDialogBox.addEventListener('close', () => refreshProjectList());
  }

  nav.appendChild(projectsContainer);

  return nav;
}
