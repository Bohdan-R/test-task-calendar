import { create } from 'zustand';
import { Event, EventsByMonth, EventsType, Month } from '../helpers/types';
import { fakeEvents } from '../DB/fakeData';
import { format, isSameDay, parse, parseISO } from 'date-fns';

type CalendarStoreState = {
  events: Event[];
  eventsByMonth: EventsByMonth;
  eventsByDate: Event[];
  openedMonth: number | null;
  filters: EventsType[];
  updateFilter: (filter: EventsType) => void;
  getEventsByMonth: (months: Month[]) => void;
  getEventsByDate: (date: Date) => void;
  setOpenMonth: (month: number) => void;
};

export const calendarStore = create<CalendarStoreState>(set => ({
  events: fakeEvents,
  eventsByMonth: {},
  eventsByDate: [],
  openedMonth: null,
  filters: [],
  updateFilter: filter =>
    set(state => {
      if (state.filters.includes(filter)) {
        return { filters: state.filters.filter(item => item !== filter) };
      }

      return { filters: [...state.filters, filter] };
    }),
  getEventsByMonth: months =>
    set(state => {
      const sanitizedMonths = months.map(m => m.monthName);

      const eventsByMonth = state.events.reduce<EventsByMonth>((acc, event) => {
        const eventDate = parse(event.startOn, 'yyyy-MM-dd HH:mm:ss', new Date());
        const monthName = format(eventDate, 'MMMM');

        const isTypeFiltered = state.filters.length === 0 || state.filters.includes(event.type);

        if (sanitizedMonths.includes(monthName) && isTypeFiltered) {
          if (!acc[monthName]) {
            acc[monthName] = [];
          }
          acc[monthName].push(event);
        }

        return acc;
      }, {});

      return { eventsByMonth };
    }),
  getEventsByDate: date =>
    set(state => {
      const events = state.events.filter(event => isSameDay(date, parseISO(event.startOn)));
      const filteredEvents =
        state.filters.length > 0 ? events.filter(event => state.filters.includes(event.type)) : events;
      return { eventsByDate: filteredEvents };
    }),
  setOpenMonth: month => set({ openedMonth: month }),
}));
