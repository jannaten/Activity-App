import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type {
  DropResult,
  DroppableProvided,
  DraggableProvided,
  DraggableStateSnapshot,
} from '@hello-pangea/dnd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  deleteActivity,
  reorderAllActivities,
  setSearchQuery,
  setSortOrder,
} from '../../features/activities/activitiesSlice';
import {
  selectFilteredActivities,
  selectSearchQuery,
  selectSortOrder,
} from '../../features/activities/activitiesSelectors';
import { useDebounce } from '../../hooks/useDebounce';
import EditActivityModal from '../../components/EditActivityModal/EditActivityModal';
import Button from '../../components/Button/Button';
import type { Activity, SortOrder } from '../../types';
import styles from './CheckActivities.module.scss';

const formatTime = (timeSet: number | undefined | null): string => {
  if (timeSet === undefined || timeSet === null || isNaN(timeSet)) return '—';
  if (timeSet <= 0) return 'Overdue';
  if (timeSet < 60) return `${timeSet}s`;
  const mins = Math.ceil(timeSet / 60);
  return `${mins} ${mins === 1 ? 'min' : 'mins'}`;
};

export default function CheckActivities(): React.ReactElement {
  const dispatch = useAppDispatch();
  const activities = useAppSelector(selectFilteredActivities);
  const searchQuery = useAppSelector(selectSearchQuery);
  const sortOrder = useAppSelector(selectSortOrder);

  const [editTarget, setEditTarget] = useState<Activity | null>(null);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const debouncedSearch = useDebounce(localSearch, 250);

  React.useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;
      dispatch(reorderAllActivities({ source: result.source, destination: result.destination }));
    },
    [dispatch]
  );

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <h1>
          All Activities <span className={styles.count}>({activities.length})</span>
        </h1>
        <div className={styles.controls}>
          <label htmlFor="search" className="sr-only">
            Search activities
          </label>
          <input
            id="search"
            type="search"
            placeholder="Search activities..."
            value={localSearch}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalSearch(e.target.value)}
            className={styles.searchInput}
          />
          <label htmlFor="sort" className="sr-only">
            Sort by
          </label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              dispatch(setSortOrder(e.target.value as SortOrder))
            }
            className={styles.sortSelect}
          >
            <option value="default">Default order</option>
            <option value="name-asc">Name A → Z</option>
            <option value="name-desc">Name Z → A</option>
            <option value="time-asc">Soonest first</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      {activities.length === 0 ? (
        <div className={styles.empty}>
          <p>{localSearch ? `No activities match "${localSearch}"` : 'No activities yet.'}</p>
          {!localSearch && (
            <Link to="/create">
              <Button>Add Activity</Button>
            </Link>
          )}
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Activity</th>
                  <th scope="col">Status</th>
                  <th scope="col">Time remaining</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <Droppable droppableId="all-activities">
                {(provided: DroppableProvided) => (
                  <tbody ref={provided.innerRef} {...provided.droppableProps}>
                    {activities.map((ac, index) => (
                      <Draggable key={ac.id} draggableId={ac.id} index={index}>
                        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`${snapshot.isDragging ? styles.dragging : ''}`}
                          >
                            <td className={ac.completed ? styles.strikethrough : ''}>{ac.name}</td>
                            <td>
                              <span
                                className={`${styles.badge} ${
                                  ac.completed ? styles.done : styles.ongoing
                                }`}
                              >
                                {ac.completed ? '✓ Done' : '● Active'}
                              </span>
                            </td>
                            <td className={styles.time}>{formatTime(ac.timeSet)}</td>
                            <td>
                              <div className={styles.actions}>
                                <button
                                  className={styles.iconBtn}
                                  onClick={() => setEditTarget(ac)}
                                  aria-label={`Edit ${ac.name}`}
                                  title="Edit"
                                >
                                  ✏️
                                </button>
                                <button
                                  className={`${styles.iconBtn} ${styles.dangerBtn}`}
                                  onClick={() => dispatch(deleteActivity(ac.id))}
                                  aria-label={`Delete ${ac.name}`}
                                  title="Delete"
                                >
                                  🗑️
                                </button>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                )}
              </Droppable>
            </table>
          </div>
        </DragDropContext>
      )}

      {editTarget && (
        <EditActivityModal activity={editTarget} onClose={() => setEditTarget(null)} />
      )}
    </div>
  );
}
