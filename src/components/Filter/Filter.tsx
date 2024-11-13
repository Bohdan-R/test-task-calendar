import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import clsx from 'clsx';
import { TABS, COLOR_DEPENDENCE_ON_EVENT } from '../../helpers/constants';
import { EventsType, Tab } from '../../helpers/types';
import { calendarStore } from '../../store/calendarStore';
import styles from './Filter.module.scss';

const Filter: React.FC = () => {
  const [filters, updateFilter] = calendarStore(useShallow(state => [state.filters, state.updateFilter]));

  const renderTab = (tab: Tab) => {
    const color = COLOR_DEPENDENCE_ON_EVENT[tab.label as EventsType];

    return (
      <button
        type="button"
        key={`${tab.label}-${tab.color}`}
        className={clsx(styles.tab, styles[color], filters.includes(tab.label) && styles.active)}
        onClick={() => updateFilter(tab.label)}
      >
        {tab.label}
      </button>
    );
  };
  return (
    <div className={styles.filter}>
      <h1 className={styles.title}>Calendar</h1>
      <div className={styles.tabs}>{TABS.map(tab => renderTab(tab))}</div>
    </div>
  );
};

export default Filter;
