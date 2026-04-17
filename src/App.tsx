import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import SkeletonLoader from './components/SkeletonLoader/SkeletonLoader';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import UndoToast from './components/UndoToast/UndoToast';
import { useTheme } from './hooks/useTheme';

const Dashboard = lazy(() => import('./screens/Dashboard/Dashboard'));
const CreateActivity = lazy(() => import('./screens/CreateActivity/CreateActivity'));
const CheckActivities = lazy(() => import('./screens/CheckActivities/CheckActivities'));
const Statistics = lazy(() => import('./screens/Statistics/Statistics'));

export default function App(): React.ReactElement {
  useTheme();

  return (
    <div className="app-root">
      <Header />
      <main>
        <ErrorBoundary>
          <Suspense fallback={<SkeletonLoader rows={4} />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/check" element={<CheckActivities />} />
              <Route path="/create" element={<CreateActivity />} />
              <Route path="/stats" element={<Statistics />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <UndoToast />
    </div>
  );
}
