import { describe, it, expect } from 'vitest';
import {
  selectAllActivities,
  selectActiveActivities,
  selectArchivedActivities,
  selectNotifiedItems,
  selectSearchQuery,
  selectSortOrder,
  selectUndoAvailable,
  selectFilteredActivities,
  selectActivityStats,
} from './activitiesSelectors';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeActivity(overrides = {}) {
  return {
    id: 'id-1',
    name: 'Running',
    completed: false,
    timeSet: 300,
    originalTimeSet: 300,
    ...overrides,
  };
}

function buildState(partial = {}) {
  return {
    activities: {
      activities: [],
      activitiesActive: [],
      activitiesArchived: [],
      notifiedItems: [],
      searchQuery: '',
      sortOrder: 'default',
      undoStack: [],
      ...partial,
    },
  };
}

// ---------------------------------------------------------------------------
// Simple selectors
// ---------------------------------------------------------------------------

describe('selectAllActivities', () => {
  it('returns the activities array', () => {
    const state = buildState({ activities: [makeActivity()] });
    expect(selectAllActivities(state)).toHaveLength(1);
  });
});

describe('selectActiveActivities', () => {
  it('returns activitiesActive', () => {
    const active = [makeActivity()];
    const state = buildState({ activitiesActive: active });
    expect(selectActiveActivities(state)).toBe(active);
  });
});

describe('selectArchivedActivities', () => {
  it('returns activitiesArchived', () => {
    const archived = [makeActivity({ completed: true })];
    const state = buildState({ activitiesArchived: archived });
    expect(selectArchivedActivities(state)).toBe(archived);
  });
});

describe('selectNotifiedItems', () => {
  it('returns notifiedItems', () => {
    const items = [makeActivity()];
    const state = buildState({ notifiedItems: items });
    expect(selectNotifiedItems(state)).toBe(items);
  });
});

describe('selectSearchQuery', () => {
  it('returns searchQuery', () => {
    expect(selectSearchQuery(buildState({ searchQuery: 'yoga' }))).toBe('yoga');
  });
});

describe('selectSortOrder', () => {
  it('returns sortOrder', () => {
    expect(selectSortOrder(buildState({ sortOrder: 'name-asc' }))).toBe('name-asc');
  });
});

describe('selectUndoAvailable', () => {
  it('returns false when undoStack is empty', () => {
    expect(selectUndoAvailable(buildState({ undoStack: [] }))).toBe(false);
  });

  it('returns true when undoStack has entries', () => {
    expect(selectUndoAvailable(buildState({ undoStack: [{ type: 'add', id: 'x' }] }))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// selectFilteredActivities
// ---------------------------------------------------------------------------

describe('selectFilteredActivities', () => {
  const activities = [
    makeActivity({ id: '1', name: 'Running', timeSet: 200, completed: false }),
    makeActivity({ id: '2', name: 'Yoga', timeSet: 100, completed: false }),
    makeActivity({ id: '3', name: 'Cooking', timeSet: NaN, completed: true }),
  ];

  it('returns all activities when query is empty and sortOrder is default', () => {
    const state = buildState({ activities, searchQuery: '', sortOrder: 'default' });
    expect(selectFilteredActivities(state)).toHaveLength(3);
  });

  it('filters by search query (case-insensitive)', () => {
    const state = buildState({ activities, searchQuery: 'run', sortOrder: 'default' });
    const result = selectFilteredActivities(state);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Running');
  });

  it('returns empty array when query matches nothing', () => {
    const state = buildState({ activities, searchQuery: 'zzz', sortOrder: 'default' });
    expect(selectFilteredActivities(state)).toHaveLength(0);
  });

  it('sorts by name ascending', () => {
    const state = buildState({ activities, searchQuery: '', sortOrder: 'name-asc' });
    const result = selectFilteredActivities(state);
    expect(result[0].name).toBe('Cooking');
    expect(result[1].name).toBe('Running');
    expect(result[2].name).toBe('Yoga');
  });

  it('sorts by name descending', () => {
    const state = buildState({ activities, searchQuery: '', sortOrder: 'name-desc' });
    const result = selectFilteredActivities(state);
    expect(result[0].name).toBe('Yoga');
    expect(result[2].name).toBe('Cooking');
  });

  it('sorts by time ascending (NaN/completed activities go last)', () => {
    const state = buildState({ activities, searchQuery: '', sortOrder: 'time-asc' });
    const result = selectFilteredActivities(state);
    expect(result[0].id).toBe('2'); // timeSet 100
    expect(result[1].id).toBe('1'); // timeSet 200
    expect(result[2].id).toBe('3'); // NaN → Infinity
  });

  it('sorts by status (active before completed)', () => {
    const state = buildState({ activities, searchQuery: '', sortOrder: 'status' });
    const result = selectFilteredActivities(state);
    // completed activities (completed: true) sort after active
    expect(result[result.length - 1].completed).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// selectActivityStats
// ---------------------------------------------------------------------------

describe('selectActivityStats', () => {
  it('returns zeros for an empty list', () => {
    const state = buildState({ activities: [] });
    expect(selectActivityStats(state)).toEqual({
      total: 0,
      completed: 0,
      active: 0,
      completionRate: 0,
    });
  });

  it('calculates correct stats for a mixed list', () => {
    const state = buildState({
      activities: [
        makeActivity({ id: '1', completed: false }),
        makeActivity({ id: '2', completed: true }),
        makeActivity({ id: '3', completed: true }),
      ],
    });
    expect(selectActivityStats(state)).toEqual({
      total: 3,
      completed: 2,
      active: 1,
      completionRate: 67, // Math.round((2/3)*100)
    });
  });

  it('returns 100% when all activities are completed', () => {
    const state = buildState({
      activities: [
        makeActivity({ id: '1', completed: true }),
        makeActivity({ id: '2', completed: true }),
      ],
    });
    expect(selectActivityStats(state).completionRate).toBe(100);
  });
});
