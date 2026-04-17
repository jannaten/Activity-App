import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import type { Activity, UndoAction, SortOrder } from '../../types';

export interface ActivitiesState {
  activities: Activity[];
  activitiesActive: Activity[];
  activitiesArchived: Activity[];
  notifiedItems: Activity[];
  searchQuery: string;
  sortOrder: SortOrder;
  undoStack: UndoAction[];
}

/** Returns total seconds encoded in a HH:MM time string. */
const secondsFromTimeString = (timeStr: string): number => {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 3600 + m * 60;
};

/** Current wall-clock time in total seconds (includes seconds component for precision). */
const currentSeconds = (): number => {
  const now = new Date();
  return now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
};

const initialState: ActivitiesState = {
  activities: [
    { id: uuid(), name: 'Running', completed: false, timeSet: 180, originalTimeSet: 180 },
    { id: uuid(), name: 'Cooking', completed: true, timeSet: NaN, originalTimeSet: NaN },
    { id: uuid(), name: 'Sleeping', completed: false, timeSet: 300, originalTimeSet: 300 },
  ],
  activitiesActive: [],
  activitiesArchived: [],
  notifiedItems: [],
  searchQuery: '',
  sortOrder: 'default',
  undoStack: [],
};

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    syncDerivedLists(state) {
      state.activitiesActive = state.activities.filter((a) => !a.completed);
      state.activitiesArchived = state.activities.filter((a) => a.completed);
    },

    addActivity(state, action: PayloadAction<{ name: string; timeStr: string }>) {
      const { name, timeStr } = action.payload;
      const setTime = secondsFromTimeString(timeStr);
      const now = currentSeconds();
      if (setTime <= now) return;
      const remaining = setTime - now;
      const newActivity: Activity = {
        id: uuid(),
        name: name.trim(),
        completed: false,
        timeSet: remaining,
        originalTimeSet: remaining,
      };
      state.undoStack.push({ type: 'add', id: newActivity.id });
      state.activities.push(newActivity);
      state.activitiesActive = state.activities.filter((a) => !a.completed);
    },

    archiveActivity(state, action: PayloadAction<string>) {
      const id = action.payload;
      const idx = state.activities.findIndex((a) => a.id === id);
      if (idx === -1) return;
      state.undoStack.push({ type: 'archive', snapshot: { ...state.activities[idx] } });
      state.activities[idx].completed = true;
      state.activities[idx].timeSet = NaN;
      state.activitiesActive = state.activities.filter((a) => !a.completed);
      state.activitiesArchived = state.activities.filter((a) => a.completed);
    },

    deleteActivity(state, action: PayloadAction<string>) {
      const id = action.payload;
      const snapshot = state.activities.find((a) => a.id === id);
      if (snapshot) state.undoStack.push({ type: 'delete', snapshot: { ...snapshot } });
      state.activities = state.activities.filter((a) => a.id !== id);
      state.activitiesActive = state.activities.filter((a) => !a.completed);
      state.activitiesArchived = state.activities.filter((a) => a.completed);
    },

    updateActivity(
      state,
      action: PayloadAction<{ id: string; name: string; timeStr?: string; completed: boolean }>
    ) {
      const { id, name, timeStr, completed } = action.payload;
      const idx = state.activities.findIndex((a) => a.id === id);
      if (idx === -1) return;
      state.undoStack.push({ type: 'update', snapshot: { ...state.activities[idx] } });
      state.activities[idx].name = name.trim();
      state.activities[idx].completed = completed;
      if (!completed && timeStr) {
        const setTime = secondsFromTimeString(timeStr);
        const now = currentSeconds();
        const remaining = setTime - now;
        state.activities[idx].timeSet = remaining;
        state.activities[idx].originalTimeSet = remaining;
      } else if (completed) {
        state.activities[idx].timeSet = NaN;
      }
      state.activitiesActive = state.activities.filter((a) => !a.completed);
      state.activitiesArchived = state.activities.filter((a) => a.completed);
    },

    reorderActivities(
      state,
      action: PayloadAction<{ source: { index: number }; destination: { index: number } | null }>
    ) {
      const { source, destination } = action.payload;
      if (!destination) return;
      const items = [...state.activitiesActive];
      const [moved] = items.splice(source.index, 1);
      if (!moved) return;
      items.splice(destination.index, 0, moved);
      state.activitiesActive = items;
      const archived = state.activities.filter((a) => a.completed);
      state.activities = [...items, ...archived];
    },

    reorderAllActivities(
      state,
      action: PayloadAction<{ source: { index: number }; destination: { index: number } | null }>
    ) {
      const { source, destination } = action.payload;
      if (!destination) return;
      const items = [...state.activities];
      const [moved] = items.splice(source.index, 1);
      if (!moved) return;
      items.splice(destination.index, 0, moved);
      state.activities = items;
    },

    /** Ticks every 1 second — called by useActivityTimer. */
    decrementTime(state) {
      const newNotified: Activity[] = [];
      state.activitiesActive = state.activitiesActive.map((a) => {
        const prev = a.timeSet;
        const updated = { ...a, timeSet: a.timeSet - 1 };
        // Only notify at the exact moment the countdown crosses zero (prev > 0, now <= 0).
        if (prev > 0 && updated.timeSet <= 0 && !updated.completed) {
          newNotified.push(updated);
        }
        return updated;
      });
      if (newNotified.length > 0) state.notifiedItems = newNotified;
      const activeIds = new Set(state.activitiesActive.map((a) => a.id));
      state.activities = state.activities.map((a) =>
        activeIds.has(a.id) ? { ...a, timeSet: a.timeSet - 1 } : { ...a }
      );
    },

    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },

    setSortOrder(state, action: PayloadAction<SortOrder>) {
      state.sortOrder = action.payload;
    },

    undoLastAction(state) {
      const last = state.undoStack.pop();
      if (!last) return;
      if (last.type === 'add') {
        state.activities = state.activities.filter((a) => a.id !== last.id);
      } else if (last.type === 'delete') {
        const idx = state.activities.findIndex((a) => a.id === last.snapshot.id);
        if (idx === -1) state.activities.push(last.snapshot);
      } else if (last.type === 'archive' || last.type === 'update') {
        const idx = state.activities.findIndex((a) => a.id === last.snapshot.id);
        if (idx !== -1) state.activities[idx] = last.snapshot;
      }
      state.activitiesActive = state.activities.filter((a) => !a.completed);
      state.activitiesArchived = state.activities.filter((a) => a.completed);
    },
  },
});

export const {
  syncDerivedLists,
  addActivity,
  archiveActivity,
  deleteActivity,
  updateActivity,
  reorderActivities,
  reorderAllActivities,
  decrementTime,
  setSearchQuery,
  setSortOrder,
  undoLastAction,
} = activitiesSlice.actions;

export default activitiesSlice.reducer;
