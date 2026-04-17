import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import reducer, {
  syncDerivedLists,
  addActivity,
  archiveActivity,
  deleteActivity,
  updateActivity,
  reorderActivities,
  decrementTime,
  setSearchQuery,
  setSortOrder,
  undoLastAction,
  type ActivitiesState,
} from './activitiesSlice';
import type { Activity } from '../../types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const emptyState: ActivitiesState = {
  activities: [],
  activitiesActive: [],
  activitiesArchived: [],
  notifiedItems: [],
  searchQuery: '',
  sortOrder: 'default',
  undoStack: [],
};

function makeActivity(overrides: Partial<Activity> = {}): Activity {
  return {
    id: 'id-1',
    name: 'Running',
    completed: false,
    timeSet: 300,
    originalTimeSet: 300,
    ...overrides,
  };
}

function stateWith(activities: Activity[]): ActivitiesState {
  const active = activities.filter((a) => !a.completed);
  const archived = activities.filter((a) => a.completed);
  return { ...emptyState, activities, activitiesActive: active, activitiesArchived: archived };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('activitiesSlice — initial state', () => {
  it('provides a non-empty initial state (3 demo activities)', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state.activities).toHaveLength(3);
    expect(state.searchQuery).toBe('');
    expect(state.sortOrder).toBe('default');
    expect(state.undoStack).toHaveLength(0);
  });
});

describe('syncDerivedLists', () => {
  it('rebuilds activitiesActive and activitiesArchived from activities array', () => {
    const mixed: ActivitiesState = {
      ...emptyState,
      activities: [
        makeActivity({ id: '1', completed: false }),
        makeActivity({ id: '2', completed: true }),
      ],
    };
    const next = reducer(mixed, syncDerivedLists());
    expect(next.activitiesActive).toHaveLength(1);
    expect(next.activitiesArchived).toHaveLength(1);
  });
});

describe('setSearchQuery', () => {
  it('updates searchQuery', () => {
    const next = reducer(emptyState, setSearchQuery('yoga'));
    expect(next.searchQuery).toBe('yoga');
  });

  it('can be cleared back to empty string', () => {
    const state = reducer(emptyState, setSearchQuery('yoga'));
    expect(reducer(state, setSearchQuery('')).searchQuery).toBe('');
  });
});

describe('setSortOrder', () => {
  it('updates sortOrder', () => {
    const next = reducer(emptyState, setSortOrder('name-asc'));
    expect(next.sortOrder).toBe('name-asc');
  });
});

describe('addActivity', () => {
  beforeEach(() => {
    vi.setSystemTime(new Date(2025, 0, 1, 8, 0, 0));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('adds a new activity with positive remaining time', () => {
    const next = reducer(emptyState, addActivity({ name: 'Morning run', timeStr: '09:00' }));
    expect(next.activities).toHaveLength(1);
    expect(next.activities[0].name).toBe('Morning run');
    expect(next.activities[0].completed).toBe(false);
    expect(next.activities[0].timeSet).toBeGreaterThan(0);
  });

  it('trims whitespace from the activity name', () => {
    const next = reducer(emptyState, addActivity({ name: '  Yoga  ', timeStr: '09:00' }));
    expect(next.activities[0].name).toBe('Yoga');
  });

  it('does NOT add activity if the scheduled time is in the past', () => {
    const next = reducer(emptyState, addActivity({ name: 'Past task', timeStr: '07:00' }));
    expect(next.activities).toHaveLength(0);
  });

  it('pushes an "add" entry to the undoStack', () => {
    const next = reducer(emptyState, addActivity({ name: 'Swim', timeStr: '09:30' }));
    expect(next.undoStack).toHaveLength(1);
    expect(next.undoStack[0]).toEqual({ type: 'add', id: next.activities[0].id });
  });

  it('updates activitiesActive list', () => {
    const next = reducer(emptyState, addActivity({ name: 'Run', timeStr: '10:00' }));
    expect(next.activitiesActive).toHaveLength(1);
  });
});

describe('archiveActivity', () => {
  it('marks the activity as completed', () => {
    const state = stateWith([makeActivity()]);
    const next = reducer(state, archiveActivity('id-1'));
    expect(next.activities[0].completed).toBe(true);
  });

  it('sets timeSet to NaN when archived', () => {
    const state = stateWith([makeActivity()]);
    const next = reducer(state, archiveActivity('id-1'));
    expect(next.activities[0].timeSet).toBeNaN();
  });

  it('moves the activity to activitiesArchived', () => {
    const state = stateWith([makeActivity()]);
    const next = reducer(state, archiveActivity('id-1'));
    expect(next.activitiesActive).toHaveLength(0);
    expect(next.activitiesArchived).toHaveLength(1);
  });

  it('pushes an "archive" entry to the undoStack', () => {
    const state = stateWith([makeActivity()]);
    const next = reducer(state, archiveActivity('id-1'));
    expect(next.undoStack[0].type).toBe('archive');
    if (next.undoStack[0].type === 'archive') {
      expect(next.undoStack[0].snapshot.id).toBe('id-1');
    }
  });

  it('does nothing for unknown id', () => {
    const state = stateWith([makeActivity()]);
    const next = reducer(state, archiveActivity('unknown'));
    expect(next.activities[0].completed).toBe(false);
  });
});

describe('deleteActivity', () => {
  it('removes the activity from the list', () => {
    const state = stateWith([makeActivity()]);
    const next = reducer(state, deleteActivity('id-1'));
    expect(next.activities).toHaveLength(0);
  });

  it('pushes a "delete" entry with the snapshot to the undoStack', () => {
    const state = stateWith([makeActivity()]);
    const next = reducer(state, deleteActivity('id-1'));
    expect(next.undoStack[0]).toEqual({
      type: 'delete',
      snapshot: expect.objectContaining({ id: 'id-1' }),
    });
  });

  it('updates both active and archived derived lists', () => {
    const state = stateWith([makeActivity()]);
    const next = reducer(state, deleteActivity('id-1'));
    expect(next.activitiesActive).toHaveLength(0);
    expect(next.activitiesArchived).toHaveLength(0);
  });
});

describe('updateActivity', () => {
  beforeEach(() => {
    vi.setSystemTime(new Date(2025, 0, 1, 8, 0, 0));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('updates the activity name', () => {
    const state = stateWith([makeActivity()]);
    const next = reducer(
      state,
      updateActivity({ id: 'id-1', name: 'Evening walk', timeStr: '10:00', completed: false })
    );
    expect(next.activities[0].name).toBe('Evening walk');
  });

  it('clears timeSet when marking as completed', () => {
    const state = stateWith([makeActivity()]);
    const next = reducer(state, updateActivity({ id: 'id-1', name: 'Running', completed: true }));
    expect(next.activities[0].timeSet).toBeNaN();
  });

  it('pushes an "update" entry to the undoStack', () => {
    const state = stateWith([makeActivity()]);
    const next = reducer(
      state,
      updateActivity({ id: 'id-1', name: 'Updated', timeStr: '10:00', completed: false })
    );
    expect(next.undoStack[0].type).toBe('update');
  });
});

describe('reorderActivities', () => {
  it('reorders activitiesActive and keeps archived at the end of activities', () => {
    const acts: Activity[] = [
      makeActivity({ id: 'a', name: 'A', completed: false }),
      makeActivity({ id: 'b', name: 'B', completed: false }),
      makeActivity({ id: 'c', name: 'C', completed: true }),
    ];
    const state = stateWith(acts);
    const next = reducer(
      state,
      reorderActivities({ source: { index: 0 }, destination: { index: 1 } })
    );
    expect(next.activitiesActive[0].id).toBe('b');
    expect(next.activitiesActive[1].id).toBe('a');
    expect(next.activities[2].id).toBe('c');
  });

  it('does nothing when destination is null', () => {
    const state = stateWith([makeActivity({ id: 'a' }), makeActivity({ id: 'b' })]);
    const next = reducer(state, reorderActivities({ source: { index: 0 }, destination: null }));
    expect(next.activitiesActive[0].id).toBe('a');
  });
});

describe('decrementTime', () => {
  it('decrements timeSet on all active activities by 1', () => {
    const state = stateWith([makeActivity({ timeSet: 10 })]);
    const next = reducer(state, decrementTime());
    expect(next.activitiesActive[0].timeSet).toBe(9);
    expect(next.activities[0].timeSet).toBe(9);
  });

  it('pushes to notifiedItems when timeSet crosses zero (prev > 0, next <= 0)', () => {
    const state = stateWith([makeActivity({ timeSet: 1 })]);
    const next = reducer(state, decrementTime());
    expect(next.notifiedItems).toHaveLength(1);
    expect(next.notifiedItems[0].id).toBe('id-1');
  });

  it('does NOT notify if timeSet is already negative', () => {
    const state = stateWith([makeActivity({ timeSet: -5 })]);
    const next = reducer(state, decrementTime());
    expect(next.notifiedItems).toHaveLength(0);
  });

  it('does not decrement time on archived (completed) activities', () => {
    const state = stateWith([makeActivity({ id: 'arch', completed: true, timeSet: 100 })]);
    const next = reducer(state, decrementTime());
    expect(next.activities.find((a) => a.id === 'arch')!.timeSet).toBe(100);
  });
});

describe('undoLastAction', () => {
  it('does nothing when undoStack is empty', () => {
    expect(reducer(emptyState, undoLastAction())).toEqual(emptyState);
  });

  it('reverses a delete by restoring the snapshot', () => {
    const state: ActivitiesState = {
      ...emptyState,
      undoStack: [{ type: 'delete', snapshot: makeActivity() }],
    };
    const next = reducer(state, undoLastAction());
    expect(next.activities).toHaveLength(1);
    expect(next.undoStack).toHaveLength(0);
  });

  it('reverses an add by removing the activity', () => {
    const activity = makeActivity();
    const state: ActivitiesState = {
      ...emptyState,
      activities: [activity],
      activitiesActive: [activity],
      undoStack: [{ type: 'add', id: 'id-1' }],
    };
    const next = reducer(state, undoLastAction());
    expect(next.activities).toHaveLength(0);
  });

  it('reverses an archive by restoring completed=false', () => {
    const archived = makeActivity({ completed: true, timeSet: NaN });
    const state: ActivitiesState = {
      ...emptyState,
      activities: [archived],
      activitiesArchived: [archived],
      undoStack: [{ type: 'archive', snapshot: makeActivity({ completed: false, timeSet: 300 }) }],
    };
    const next = reducer(state, undoLastAction());
    expect(next.activities[0].completed).toBe(false);
  });

  it('pops exactly one item from the undoStack', () => {
    const state: ActivitiesState = {
      ...emptyState,
      undoStack: [
        { type: 'delete', snapshot: makeActivity({ id: 'x' }) },
        { type: 'delete', snapshot: makeActivity({ id: 'y' }) },
      ],
    };
    const next = reducer(state, undoLastAction());
    expect(next.undoStack).toHaveLength(1);
  });
});
