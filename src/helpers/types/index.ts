export type NavLink = {
  label: string;
  href: string;
};

export type Tab = {
  label: EventsType;
  color: string;
};

export type Event = {
  type: EventsType;
  title: string;
  description: string;
  startOn: string;
  location: string;
};

export type EventsByMonth = {
  [key: string]: Event[];
};

export type EventsType = 'Meeting with an expert' | 'Question-answer' | 'Conference' | 'Webinar';

export type EventsColor = 'red' | 'green' | 'yellow' | 'blue';

export type Month = {
  monthName: string;
  monthNumber: number;
  year: number;
};
