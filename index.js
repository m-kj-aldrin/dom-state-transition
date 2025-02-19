import { defineDomStateMap, transitionDomEvent } from "./dom-state.js";

const testState = defineDomStateMap({
  open: [
    [
      KeyboardEvent,
      {
        condition: (element, event) => {
          return event.key === "Enter";
        },
        nextState: "closed",
        action: (element, event) => {
          console.log({ msg: "open", element, event });
        },
      },
    ],
  ],
  closed: [
    [
      KeyboardEvent,
      {
        condition: (element, event) => {
          return event.key === "Enter";
        },
        nextState: "open",
        action: (element, event) => {
          console.log({ msg: "closed", element, event });
        },
      },
    ],
  ],
});

document.body.setAttribute("data-state", "open");

document.body.addEventListener("keydown", (event) => {
  transitionDomEvent(testState, event, document.body);
});
