export const afterDeleteActivityArray = (state, action) =>
  state.activities.filter((el) => el.id !== action.payload);

export const afterDeleteActiveActivityArray = (state, action) =>
  state.activitiesActive.filter((el) => el.id !== action.payload);

export const afterDeleteNonActiveActivityArray = (state, action) =>
  state.activitiesNonActive.filter((el) => el.id !== action.payload);

export const editedArrayOne = (state, getValue, setValidTime, windowTime) =>
  state.activities.map((ac) => {
    if (ac.id === getValue.id && ac.completed === false) {
      ac.name = getValue.name;
      ac.completed = getValue.completed;
      ac.timeSet = setValidTime - windowTime;
    }
    return ac;
  });

export const editedArrayTwo = (state, getValue) =>
  state.activities.map((ac) => {
    if (ac.id === getValue.id && ac.completed === true) {
      ac.name = getValue.name;
      ac.completed = getValue.completed;
      ac.timeSet = NaN;
    }
    return ac;
  });

export const getfilteredArr = (state) => {
  let arrayActiveObject = [];
  state.activities.map((ac) => {
    if (ac.completed !== true) {
      return arrayActiveObject.push({ ...ac, timeSet: ac.timeSet });
    }
    return arrayActiveObject;
  });
  let getfilteredArr = arrayActiveObject.filter((ac) => ac !== undefined);
  return getfilteredArr;
};

export const getfilteredArray = (state) => {
  let arrayNonActiveObject = [];
  state.activities.map((ac) => {
    if (ac.completed === true) {
      return arrayNonActiveObject.push({ ...ac });
    }
    return arrayNonActiveObject;
  });
  let getfilteredArray = arrayNonActiveObject.filter((ac) => ac !== undefined);
  return getfilteredArray;
};

export const items = (action, state) => {
  const { destination, source } = action.payload;
  if (!destination) return;
  const items = Array.from(state.activitiesActive);
  const [reorderedItem] = items.splice(source.index, 1);
  items.splice(destination.index, 0, reorderedItem);
  return [...items];
};

export const checkItems = (action, state) => {
  if (!action.payload.destination) return;
  const checkItems = Array.from(state.activities);
  const [checkReorderedItem] = checkItems.splice(
    action.payload.source.index,
    1
  );
  checkItems.splice(action.payload.destination.index, 0, checkReorderedItem);
  return [...checkItems];
};
