import { v4 as uuid } from "uuid";
import { initState } from "./activities.state";
import { ActivitiesActionTypes as TYPES } from "./activities.types";
import { editedArrayOne, editedArrayTwo } from "./activities.utils";
import { afterDeleteActiveActivityArray } from "./activities.utils";
import { items, checkItems, getfilteredArr } from "./activities.utils";
import { afterDeleteNonActiveActivityArray } from "./activities.utils";
import { afterDeleteActivityArray, getfilteredArray } from "./activities.utils";

const activitiesReducer = (state = initState, action) => {
  switch (action.type) {
    //While user giving some values it set the state
    case TYPES.HANDLE_CHANGE:
      const { value, name } = action.payload.target;
      return { ...state, [name]: value };

    //Making state for active activities
    case TYPES.SORT_ACTIVE_ACTIVITIES:
      return { ...state, activitiesActive: getfilteredArr(state) };

    //Making state for active activities
    case TYPES.SORT_NONACTIVE_ACTIVITIES:
      return { ...state, activitiesNonActive: getfilteredArray(state) };

    //Adding an activities to the state
    case TYPES.ADD_ACTIVITIES:
      action.payload.preventDefault();
      const { setName, timeSet } = state;
      let getWindowTime = new Date();
      let totalWindowTime =
        getWindowTime.getHours() * 60 + getWindowTime.getMinutes();
      let setTime =
        Number(timeSet.split(":")[0]) * 60 + Number(timeSet.split(":")[1]);
      if (setTime > totalWindowTime) {
        let obj = {
          id: uuid(),
          name: setName,
          completed: false,
          timeSet: setTime - totalWindowTime,
        };
        return {
          ...state,
          setName: "",
          timeSet: "",
          activities: [...state.activities, obj],
        };
      } else {
        alert("Please choose a upcoming time");
      }
      return { ...state };

    //Responsible for doing the drag and drop effect in Dashboard
    case TYPES.SORT_ACTIVITIES:
      return {
        ...state,
        activitiesActive: items(action, state),
      };

    //Responsible for doing drag and drop in Check all Items section
    case TYPES.SORT_CHECK_ACTIVITY:
      return {
        ...state,
        activities: checkItems(action, state),
      };

    //Setting the state for archrive activities
    case TYPES.SET_ARCHRIVE_ACTIVITIES:
      if (state.activities !== undefined && state.activities !== undefined) {
        let getArchriveItem = [];
        let modifedArray;
        let modifiedActive;
        state.activitiesActive.map((ac) => {
          if (ac.id === action.payload) {
            let obj = {
              id: ac.id,
              timeSet: NaN,
              name: ac.name,
              completed: true,
            };
            return getArchriveItem.push(obj);
          }
          modifedArray = state.activities.map((ac) => {
            if (ac.id === action.payload) {
              let obj = {
                id: ac.id,
                timeSet: NaN,
                name: ac.name,
                completed: true,
              };
              return obj;
            } else {
              let obj = {
                id: ac.id,
                name: ac.name,
                timeSet: ac.timeSet,
                completed: ac.completed,
              };
              return obj;
            }
          });
          modifiedActive = modifedArray.filter((el) => el.completed === false);
          return ac;
        });
        return {
          ...state,
          activitiesNonActive: [
            ...getArchriveItem,
            ...state.activitiesNonActive,
          ],
          activities: modifedArray,
          activitiesActive: modifiedActive,
        };
      }
      return { ...state };

    // Track the activities time
    case TYPES.SET_DECREAMENT_MINUTES:
      let newArr = state.activitiesActive.map((ac) => {
        return {
          ...ac,
          timeSet: ac.timeSet - 1,
        };
      });
      let filteredArr = newArr.filter((ac) => ac !== undefined);
      let decresedTimeArr = [...newArr, ...state.activitiesNonActive];
      let getNotifiedItem = [];
      newArr.map((nA) => {
        if (nA.timeSet <= 0) {
          return getNotifiedItem.push(nA);
        }
        return getNotifiedItem;
      });
      let getFilteredNotifiedItem = getNotifiedItem.filter(
        (ac) => ac !== undefined && ac.completed === false
      );
      return {
        ...state,
        activities: decresedTimeArr,
        activitiesActive: filteredArr,
        notifiedItem: getFilteredNotifiedItem,
      };

    //Setting the state for some unhandled properties
    case TYPES.SET_DEFINED:
      let nonActiveArr = state.activitiesNonActive;
      return { ...state, activitiesActive: [], activities: nonActiveArr };

    //Toggling models as well as set some important states
    case TYPES.TOGGLE_MODAL:
      return {
        ...state,
        setName: "",
        setId: action.payload.setId,
        showModal: action.payload.showModal,
        setCompleted: action.payload.setCompleted,
        setValidTime: action.payload.setValidTime,
      };

    //Editing activites to the UI
    case TYPES.UPDATE_ACTIVITY:
      let getTheWindowTime = new Date();
      let windowTime =
        getTheWindowTime.getHours() * 60 + getTheWindowTime.getMinutes();
      let setValidTime =
        Number(state.timeSet.split(":")[0]) * 60 +
        Number(state.timeSet.split(":")[1]);
      let getValue = action.payload;
      if (
        setValidTime &&
        getValue.name !== "" &&
        getValue.timeSet !== "" &&
        setValidTime > windowTime
      ) {
        return {
          ...state,
          setId: "",
          setName: "",
          timeSet: "",
          setValidTime: 0,
          showModal: false,
          activities: editedArrayOne(state, getValue, setValidTime, windowTime),
        };
      } else if (
        !setValidTime &&
        getValue.name !== "" &&
        getValue.timeSet === ""
      ) {
        return {
          ...state,
          setId: "",
          setName: "",
          timeSet: "",
          setValidTime: 0,
          showModal: false,
          activities: editedArrayTwo(state, getValue),
        };
      } else {
        alert("Please choose a upcoming time");
      }
      return { ...state };

    //Remove an activity from the UI
    case TYPES.DELETE_ACTIVITY:
      return {
        ...state,
        activities: afterDeleteActivityArray(state, action),
        activitiesActive: afterDeleteActiveActivityArray(state, action),
        activitiesNonActive: afterDeleteNonActiveActivityArray(state, action),
      };

    //If no action happens its retruns the states
    default:
      return state;
  }
};

export default activitiesReducer;
