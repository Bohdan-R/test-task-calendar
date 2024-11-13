import React, { useEffect, useState } from 'react';
import { add, format, getMonth, getYear } from 'date-fns';
import { useShallow } from 'zustand/react/shallow';
import { calendarStore } from '../../store/calendarStore';
import Filter from '../../components/Filter/Filter';
import EventsCalendar from '../../components/Calendar/Calendar';
import { Month } from '../../helpers/types';

import styles from './CalendarPage.module.scss';

const CalendarPage: React.FC = () => {
  const [months, setMonths] = useState<Month[]>([]);
  const [eventsByMonth, filters, getEventsByMonth] = calendarStore(
    useShallow(state => [state.eventsByMonth, state.filters, state.getEventsByMonth]),
  );

  const getSixMonths = () => {
    const months = [];
    const currentDate = new Date();

    for (let i = 0; i < 6; i++) {
      const date = add(currentDate, { months: i });
      const monthName = format(date, 'MMMM');
      const monthNumber = getMonth(date);
      const year = getYear(date);

      months.push({
        monthName,
        monthNumber,
        year,
      });
    }

    return months;
  };

  useEffect(() => {
    setMonths(getSixMonths());
  }, []);

  useEffect(() => {
    if (months.length > 0) {
      getEventsByMonth(months);
    }
  }, [months, filters.length]);

  const groupMonths = () => {
    const groupedMonths = [];
    for (let i = 0; i < months.length; i += 3) {
      groupedMonths.push(months.slice(i, i + 3));
    }

    return groupedMonths;
  };

  return (
    <div className={styles.page}>
      <Filter />
      <div className={styles.container}>
        {months.length > 0 &&
          eventsByMonth &&
          groupMonths().map((group, index) => (
            <div className={styles.group} key={index}>
              {group.map((m, i) => {
                const calendarIndex = i + 1 + index * 3;
                return (
                  <div className={styles.item}>
                    <EventsCalendar
                      key={m.monthName}
                      month={m.monthNumber}
                      year={m.year}
                      index={calendarIndex}
                      monthTitle={m.monthName}
                      events={eventsByMonth[m.monthName]}
                    />
                  </div>
                );
              })}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CalendarPage;
