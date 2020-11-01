import { v4 as uuid } from "uuid";

export const initState = {
  setId: "",
  setName: "",
  setCompleted: "",
  setValidTime: "",
  showModal: false,
  notifiedItem: [],
  activitiesActive: [],
  activitiesNonActive: [],
  timeSet: new Date().getHours() + ":" + new Date().getMinutes(),
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
