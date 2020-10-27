import { v4 as uuid } from "uuid";

const initState = {
  setId: "",
  setCompleted: "",
  setValidTime: "",
  showModal: false,
  setName: "",
  timeSet: "",
  notifiedItem: [],
  activitiesActive: [],
  activitiesNonActive: [],
  activities: [
    {
      id: uuid(),
      name: "Running",
      completed: false,
      timeSet:
        Number("00:03".split(":")[0]) * 60 + Number("00:03".split(":")[1]),
    },
    { id: uuid(), name: "Cooking", completed: true, timeSet: NaN },
    {
      id: uuid(),
      name: "Sleeping",
      completed: false,
      timeSet:
        Number("00:05".split(":")[0]) * 60 + Number("00:05".split(":")[1]),
    },
  ],
};

const activitiesReducer = (state = initState, action) => {
  switch (action.type) {
    case "HANDLE_CHANGE":
      const { value, name } = action.payload.target;
      return { ...state, [name]: value };

    case "SORT_ACTIVE_ACTIVITIES":
      let getArr = state.activities.map((ac) => {
        if (ac.completed !== true) {
          return {
            ...ac,
            timeSet: ac.timeSet,
          };
        }
      });
      let getfilteredArr = getArr.filter((ac) => ac !== undefined);
      return { ...state, activitiesActive: getfilteredArr };

    case "SORT_NONACTIVE_ACTIVITIES":
      let getArray = state.activities.map((ac) => {
        if (ac.completed === true) {
          return {
            ...ac,
          };
        }
      });
      let getfilteredArray = getArray.filter((ac) => ac !== undefined);
      return { ...state, activitiesNonActive: getfilteredArray };

    case "ADD_ACTIVITIES":
      action.payload.preventDefault();
      const { setName, timeSet } = state;
      let getWindowTime = new Date();
      let totalWindowTime =
        getWindowTime.getHours() * 60 + getWindowTime.getMinutes();
      let setTime =
        Number(timeSet.split(":")[0]) * 60 + Number(timeSet.split(":")[1]);
      if (setTime < totalWindowTime) {
        alert("Please choose a upcoming time");
      } else if (setTime > totalWindowTime) {
        let obj = {
          id: uuid(),
          name: setName,
          completed: false,
          timeSet: setTime - totalWindowTime,
        };
        //this.props.history.push("/");
        return {
          ...state,
          setName: "",
          timeSet: "",
          activities: [...state.activities, obj],
        };
      }
      return { ...state };

    case "SORT_ACTIVITIES":
      const { destination, source } = action.payload;
      if (!destination) return;
      const items = Array.from(state.activitiesActive);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      return {
        ...state,
        activitiesActive: [...items],
      };

    case "SET_ARCHRIVE_ACTIVITIES":
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

    case "SET_DECREAMENT_MINUTES":
      //Decrement minutes
      let newArr = state.activitiesActive.map((ac) => {
        return {
          ...ac,
          timeSet: ac.timeSet - 1,
        };
      });
      let filteredArr = newArr.filter((ac) => ac !== undefined);
      let decresedTimeArr = [...newArr, ...state.activitiesNonActive];

      //Notified Item

      let getNotifiedItem = newArr.map((nA) => {
        if (nA.timeSet <= 0) {
          return nA;
        }
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

    case "SET_DEFINED":
      let nonActiveArr = state.activitiesNonActive;
      return { ...state, activitiesActive: [], activities: nonActiveArr };

    case "TOGGLE_MODAL":
      console.log(action.payload);
      return {
        ...state,
        setId: action.payload.setId,
        showModal: action.payload.showModal,
        setCompleted: action.payload.setCompleted,
        setValidTime: action.payload.setValidTime,
      };

    case "UPDATE_ACTIVITY":
      let getTheWindowTime = new Date();
      let windowTime =
        getTheWindowTime.getHours() * 60 + getTheWindowTime.getMinutes();
      let setValidTime =
        Number(state.timeSet.split(":")[0]) * 60 +
        Number(state.timeSet.split(":")[1]);
      let getValue = action.payload;
      let editedArray = state.activities.map((ac) => {
        if (ac.id === getValue.id && ac.completed === false) {
          ac.name = getValue.name;
          ac.completed = getValue.completed;
          ac.timeSet = setValidTime - windowTime;
        } else if (ac.id === getValue.id && ac.completed === true) {
          ac.name = getValue.name;
          ac.completed = getValue.completed;
          ac.timeSet = NaN;
        }
        return ac;
      });
      return {
        ...state,
        setName: "",
        timeSet: "",
        showModal: false,
        activities: editedArray,
      };

    case "DELETE_ACTIVITY":
      const afterDeleteActivityArray = state.activities.filter(
        (el) => el.id !== action.payload
      );
      const afterDeleteActiveActivityArray = state.activitiesActive.filter(
        (el) => el.id !== action.payload
      );

      const afterDeleteNonActiveActivityArray = state.activitiesNonActive.filter(
        (el) => el.id !== action.payload
      );
      return {
        ...state,
        activities: afterDeleteActivityArray,
        activitiesActive: afterDeleteActiveActivityArray,
        activitiesNonActive: afterDeleteNonActiveActivityArray,
      };

    default:
      return state;
  }
};

export default activitiesReducer;
