export const addActivities = (state) => ({
  type: "ADD_ACTIVITIES",
  payload: state,
});

export const sortActivities = (state) => ({
  type: "SORT_ACTIVITIES",
  payload: state,
});

export const setArchriveActivities = (state) => ({
  type: "SET_ARCHRIVE_ACTIVITIES",
  payload: state,
});

export const setDecrementMinutes = (state) => ({
  type: "SET_DECREAMENT_MINUTES",
  payload: state,
});

export const handleChange = (state) => ({
  type: "HANDLE_CHANGE",
  payload: state,
});

export const sortActiveActivities = (state) => ({
  type: "SORT_ACTIVE_ACTIVITIES",
  payload: state,
});

export const sortNonActiveActivities = (state) => ({
  type: "SORT_NONACTIVE_ACTIVITIES",
  payload: state,
});

export const setDefined = (state) => ({
  type: "SET_DEFINED",
  payload: state,
});

export const deleteActivity = (state) => ({
  type: "DELETE_ACTIVITY",
  payload: state,
});

export const editActivity = (state) => ({
  type: "EDIT_ACTIVITY",
  payload: state,
});

export const toggleModal = (state) => ({
  type: "TOGGLE_MODAL",
  payload: state,
});
