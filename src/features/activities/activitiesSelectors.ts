import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { Activity } from '../../types';

const selectActivitiesState = (state: RootState) => state.activities;

export const selectAllActivities = createSelector(selectActivitiesState, (s) => s.activities);

export const selectActiveActivities = createSelector(
  selectActivitiesState,
  (s) => s.activitiesActive
);

export const selectArchivedActivities = createSelector(
  selectActivitiesState,
  (s) => s.activitiesArchived
);

export const selectNotifiedItems = createSelector(selectActivitiesState, (s) => s.notifiedItems);

export const selectSearchQuery = createSelector(selectActivitiesState, (s) => s.searchQuery);

export const selectSortOrder = createSelector(selectActivitiesState, (s) => s.sortOrder);

export const selectUndoAvailable = createSelector(
  selectActivitiesState,
  (s) => s.undoStack.length > 0
);

export const selectFilteredActivities = createSelector(
  [selectAllActivities, selectSearchQuery, selectSortOrder],
  (activities, query, sortOrder) => {
    let result: Activity[] = [...activities];
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter((a) => a.name.toLowerCase().includes(q));
    }
    if (sortOrder === 'name-asc') result.sort((a, b) => a.name.localeCompare(b.name));
    if (sortOrder === 'name-desc') result.sort((a, b) => b.name.localeCompare(a.name));
    if (sortOrder === 'time-asc')
      result.sort(
        (a, b) =>
          (isNaN(a.timeSet) ? Infinity : a.timeSet) - (isNaN(b.timeSet) ? Infinity : b.timeSet)
      );
    if (sortOrder === 'status') result.sort((a, b) => Number(a.completed) - Number(b.completed));
    return result;
  }
);

export const selectActivityStats = createSelector(selectAllActivities, (activities) => {
  const total = activities.length;
  const completed = activities.filter((a) => a.completed).length;
  const active = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { total, completed, active, completionRate };
});
