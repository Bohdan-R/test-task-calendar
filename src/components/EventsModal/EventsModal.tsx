import React, { useLayoutEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import clsx from 'clsx';
import { COLOR_DEPENDENCE_ON_EVENT } from '../../helpers/constants';
import { Event } from '../../helpers/types';
import styles from './EventsModal.module.scss';

type EventsModalProps = {
  events: Event[];
  position: 'under' | 'over';
  marginTop: number;
};

const EventsModal: React.FC<EventsModalProps> = ({ events, position, marginTop }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [modalHeight, setModalHeight] = useState(0);

  const margin = position === 'under' ? { top: `${marginTop + 40}px` } : { top: `${marginTop - modalHeight}px` };

  useLayoutEffect(() => {
    if (modalRef.current) {
      setModalHeight(modalRef.current.offsetHeight);
    }
  }, [modalRef, events]);

  const renderEvent = (event: Event) => {
    const formattedDate = format(event.startOn, 'dd MMMM');
    const color = COLOR_DEPENDENCE_ON_EVENT[event.type];
    return (
      <div key={`${event.title}-${event.startOn}-${event.location}`} className={styles.event}>
        <div className={styles.header}>
          <div className={styles.title}>{event.title}</div>
          <button className={styles.edit}></button>
        </div>

        <div className={styles.content}>
          <div className={styles.description}>{event.description}</div>
          <div className={styles.location}>{event.location}</div>
        </div>

        <div className={styles.footer}>
          <div className={clsx(styles.date, styles[color])}>{formattedDate}</div>
          <div className={clsx(styles.type, styles[color])}>{event.type}</div>
        </div>
      </div>
    );
  };

  return (
    <div ref={modalRef} className={styles.modal} style={margin}>
      <div className={styles.name}>Events</div>
      <div className={styles.container}>{events.map(event => renderEvent(event))}</div>
      <button type="button" className={styles.btn}>
        Add event
      </button>
    </div>
  );
};

export default EventsModal;
