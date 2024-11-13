import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from '../Loader/Loader';

const MainPage = lazy(() => import('../../pages/MainPage/MainPage'));
const EventsPage = lazy(() => import('../../pages/EventsPage/EventsPage'));
const CalendarPage = lazy(() => import('../../pages/CalendarPage/CalendarPage'));
const FAQPage = lazy(() => import('../../pages/FAQPage/FAQPage'));

const RoutesComponent: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
          <Loader />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default RoutesComponent;
