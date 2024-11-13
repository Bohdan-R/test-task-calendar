import React, { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import clsx from 'clsx';
import { useShallow } from 'zustand/react/shallow';
import { set, getMonth, parseISO, isSameDay } from 'date-fns';
import { calendarStore } from '../../store/calendarStore';
import { Event, EventsType } from '../../helpers/types';
import { COLOR_DEPENDENCE_ON_EVENT } from '../../helpers/constants';
import 'react-calendar/dist/Calendar.css';

import styles from './Calendar.module.scss';
import EventsModal from '../EventsModal/EventsModal';

type EventsCalendarProps = {
  month: number;
  year: number;
  monthTitle: string;
  index: number;
  events: Event[];
};

const EventsCalendar: React.FC<EventsCalendarProps> = ({ month, year, monthTitle, events }) => {
  const calendarRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState<'under' | 'over'>('under');
  const [marginTop, setMarginTop] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  const [eventsByDate, getEventsByDate, openedMonth, setOpenMonth, filters] = calendarStore(
    useShallow(state => [
      state.eventsByDate,
      state.getEventsByDate,
      state.openedMonth,
      state.setOpenMonth,
      state.filters,
    ]),
  );

  useEffect(() => {
    if (openedMonth !== month) {
      setIsOpen(false);
    }
  }, [openedMonth]);

  useEffect(() => {
    setIsOpen(false);
  }, [filters.length]);

  const firstDayOfMonth = set(new Date(), { year, month, date: 1 });

  const tileContent = ({ date }: { date: Date }) => {
    const dayEvents = events?.filter(event => {
      return isSameDay(date, parseISO(event.startOn));
    });

    return (
      <>
        <div className={styles.day}>
          {dayEvents?.map((event, index) => {
            const color = COLOR_DEPENDENCE_ON_EVENT[event.type as EventsType];
            return <span key={index} className={clsx(styles.dot, styles[color])}></span>;
          })}
        </div>
      </>
    );
  };

  const handleDateClick = (date: Date, event: React.MouseEvent) => {
    if (calendarRef.current) {
      const calendarRect = calendarRef.current.getBoundingClientRect();
      const clickedElement = event.currentTarget as HTMLElement;
      const clickedElementRect = clickedElement.getBoundingClientRect();

      const relativeTop = clickedElementRect.top - calendarRect.top;

      setMarginTop(relativeTop);
    }

    const calendarElement = event.currentTarget as HTMLElement;
    const { bottom } = calendarElement.getBoundingClientRect();

    if (currentDate && isSameDay(date, currentDate)) {
      setIsOpen(!isOpen);
    } else {
      setIsOpen(true);
    }
    setPosition(window.innerHeight - bottom < 400 ? 'over' : 'under');
    setCurrentDate(date);
    setOpenMonth(month);
    getEventsByDate(date);
  };

  return (
    <div ref={calendarRef} className={styles.calendar}>
      <span className={styles.month}>{monthTitle}</span>
      <Calendar
        view="month"
        maxDetail="month"
        minDetail="month"
        activeStartDate={firstDayOfMonth}
        showNavigation={false}
        onClickDay={(value, event) => handleDateClick(value, event)}
        tileContent={tileContent}
        tileDisabled={({ date, view }) => view === 'month' && getMonth(date) !== month}
        locale="en-US"
      />
      {isOpen && openedMonth === month && eventsByDate.length > 0 && (
        <EventsModal position={position} marginTop={marginTop} events={eventsByDate} />
      )}
    </div>
  );
};

export default EventsCalendar;
