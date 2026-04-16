import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { archiveActivity, reorderActivities } from '../../features/activities/activitiesSlice';
import { selectActiveActivities } from '../../features/activities/activitiesSelectors';
import Button from '../Button/Button';
import styles from './ActiveActivities.module.scss';

export default function ActiveActivities() {
  const dispatch = useDispatch();
  const activitiesActive = useSelector(selectActiveActivities);

  const handleDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;
      dispatch(reorderActivities({ source: result.source, destination: result.destination }));
    },
    [dispatch]
  );

  const formatCountdown = (timeSet) => {
    if (timeSet > 60) {
      const mins = Math.ceil(timeSet / 60);
      return `${mins} ${mins === 1 ? 'minute' : 'minutes'} to go`;
    }
    if (timeSet > 0) {
      return `${timeSet} ${timeSet === 1 ? 'second' : 'seconds'} to go`;
    }
    const late = Math.abs(timeSet);
    if (late < 60) return `${late} ${late === 1 ? 'second' : 'seconds'} overdue`;
    const lateMins = Math.ceil(late / 60);
    return `${lateMins} ${lateMins === 1 ? 'minute' : 'minutes'} overdue`;
  };

  const isUrgent = (timeSet) => timeSet > 0 && timeSet <= 60;

  return (
    <div className={styles.container}>
      <h2>In Progress</h2>
      {activitiesActive.length === 0 ? (
        <div className={styles.empty}>
          <p>No active activities.</p>
          <Link to="/create">
            <Button>Add Activity</Button>
          </Link>
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="active-activities">
            {(provided) => (
              <ul
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={styles.list}
                aria-label="Active activities list"
              >
                {activitiesActive.map((ac, index) => (
                  <Draggable key={ac.id} draggableId={ac.id} index={index}>
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`${styles.item} ${snapshot.isDragging ? styles.dragging : ''} ${
                          ac.timeSet <= 0
                            ? styles.overdue
                            : isUrgent(ac.timeSet)
                              ? styles.urgent
                              : ''
                        }`}
                        aria-grabbed={snapshot.isDragging}
                      >
                        <div className={styles.itemTop}>
                          <span className={styles.name}>{ac.name}</span>
                          <span
                            className={`${styles.countdown} ${ac.timeSet <= 0 ? styles.late : isUrgent(ac.timeSet) ? styles.urgentText : ''}`}
                          >
                            {formatCountdown(ac.timeSet)}
                          </span>
                        </div>
                        <div
                          className={styles.progressBar}
                          role="progressbar"
                          aria-valuenow={Math.max(0, ac.timeSet)}
                          aria-valuemin={0}
                          aria-valuemax={ac.originalTimeSet || 300}
                          aria-label={`${ac.name} progress`}
                        >
                          <div
                            className={`${styles.progressFill} ${ac.timeSet <= 0 ? styles.full : isUrgent(ac.timeSet) ? styles.urgentFill : ''}`}
                            style={{
                              width:
                                ac.timeSet <= 0
                                  ? '100%'
                                  : `${Math.min(100, Math.max(0, (1 - ac.timeSet / (ac.originalTimeSet || 300)) * 100))}%`,
                            }}
                          />
                        </div>
                        <Button
                          size="small"
                          onClick={() => dispatch(archiveActivity(ac.id))}
                          aria-label={`Mark ${ac.name} as complete`}
                        >
                          Mark complete ✓
                        </Button>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}
