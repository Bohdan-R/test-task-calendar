import { NavLink, Tab, EventsType, EventsColor } from '../types';

export const NAV_LINKS: NavLink[] = [
  {
    label: 'Main',
    href: '/',
  },
  {
    label: 'Event',
    href: '/events',
  },
  {
    label: 'Calendar',
    href: '/calendar',
  },
  {
    label: 'FAQ',
    href: '/faq',
  },
];

export const TABS: Tab[] = [
  {
    label: 'Meeting with an expert',
    color: 'red',
  },
  {
    label: 'Question-answer',
    color: 'green',
  },
  {
    label: 'Conference',
    color: 'yellow',
  },
  {
    label: 'Webinar',
    color: 'blue',
  },
];

export const COLOR_DEPENDENCE_ON_EVENT: Record<EventsType, EventsColor> = {
  'Meeting with an expert': 'red',
  'Question-answer': 'green',
  Conference: 'yellow',
  Webinar: 'blue',
};
