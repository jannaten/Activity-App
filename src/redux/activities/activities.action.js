import { ActivitiesActionTypes as TYPES } from "./activities.types";

export const addActivities = (state) => ({
  type: TYPES.ADD_ACTIVITIES,
  payload: state,
});

export const sortActivities = (state) => ({
  type: TYPES.SORT_ACTIVITIES,
  payload: state,
});

export const setArchriveActivities = (state) => ({
  type: TYPES.SET_ARCHRIVE_ACTIVITIES,
  payload: state,
});

export const setDecrementMinutes = () => ({
  type: TYPES.SET_DECREAMENT_MINUTES,
});

export const handleChange = (state) => ({
  type: TYPES.HANDLE_CHANGE,
  payload: state,
});

export const sortActiveActivities = () => ({
  type: TYPES.SORT_ACTIVE_ACTIVITIES,
});

export const sortNonActiveActivities = () => ({
  type: TYPES.SORT_NONACTIVE_ACTIVITIES,
});

export const setDefined = () => ({
  type: TYPES.SET_DEFINED,
});

export const deleteActivity = (state) => ({
  type: TYPES.DELETE_ACTIVITY,
  payload: state,
});

export const toggleModal = (state) => ({
  type: TYPES.TOGGLE_MODAL,
  payload: state,
});

export const handleUpdate = (state) => ({
  type: TYPES.UPDATE_ACTIVITY,
  payload: state,
});

export const sortCheckActivities = (state) => ({
  type: TYPES.SORT_CHECK_ACTIVITY,
  payload: state,
});
