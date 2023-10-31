import menuLink from './menu-link';
import { format, isAfter } from 'date-fns';
import Storage from '../../storage';
import CalendarTodayIcon from './calendar_today_icon.svg';
import CalendarIcon from './calendar_month_icon.svg';
import CalendarUpcomingIcon from './event_upcoming_icon.svg';
import './nav.css';

export const nav = () => {
  const storage = Storage();
  const nav = document.createElement('nav');
  const allButton = document.createElement('button');
  const todayButton = document.createElement('button');
  const upcomingButton = document.createElement('button');
  const projectsHeader = document.createElement('h1');

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

  return nav;
};
