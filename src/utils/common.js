// export const getNewEventsFromLocalStorage = () => {
//   let getEvents = JSON.parse(localStorage.getItem("events"));

import { get } from "https";

//   names[0] = prompt("New member name?");
//   localStorage.setItem("names", JSON.stringify(names));
// };

export const addEventToLocalStorage = (event) => {
  let isArray = Array.isArray(getLocalStorage());
  let getPrevEvents = isArray ? getLocalStorage() : [];
  console.log("add getevents", getPrevEvents);
  getPrevEvents.push(event);
  localStorage.setItem("events", JSON.stringify(getPrevEvents));
};
export const getLocalStorage = () => {
  let getPrevEvents = JSON.parse(localStorage.getItem("events"));
  return getPrevEvents ? getPrevEvents.reverse() : getPrevEvents;
};
