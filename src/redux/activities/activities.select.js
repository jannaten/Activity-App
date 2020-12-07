import { createSelector } from "reselect";

const selectActivity = (state) => state.activities;

export const selectActivities = createSelector(
  [selectActivity],
  (activity) => activity.activities
);
export const selectSetId = createSelector(
  [selectActivity],
  (activity) => activity.setId
);
export const selectSetName = createSelector(
  [selectActivity],
  (activity) => activity.setName
);
export const selectSetCompleted = createSelector(
  [selectActivity],
  (activity) => activity.setCompleted
);
export const selectSetValidTime = createSelector(
  [selectActivity],
  (activity) => activity.setValidTime
);
export const selectShowModal = createSelector(
  [selectActivity],
  (activity) => activity.showModal
);
export const selectNotifiedItem = createSelector(
  [selectActivity],
  (activity) => activity.notifiedItem
);
export const selectActivitiesActive = createSelector(
  [selectActivity],
  (activity) => activity.activitiesActive
);
export const selectActivitiesNonActive = createSelector(
  [selectActivity],
  (activity) => activity.activitiesNonActive
);
export const selectTimeSet = createSelector(
  [selectActivity],
  (activity) => activity.timeSet
);
