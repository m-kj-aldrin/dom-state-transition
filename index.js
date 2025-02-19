import { defineDomStateMap, transitionDomEvent } from "./dom-state.js";

const testState = defineDomStateMap({
  open: [
    [
      KeyboardEvent,
      [
        {
          nextState: "closed",
          condition: (element, event) => ["Enter", " "].includes(event.key),
          action: (element, event) => {
            console.log({ msg: "open", element, event });
          }
        },
        {
          condition: (element, event) => ["ArrowUp", "ArrowDown"].includes(event.key),
          action: (element, event) => {
            console.log({ msg: "move", element, event });
          }
        }
      ]
    ],
  ],
  closed: [
    [
      KeyboardEvent,
      [
        {
          nextState: "open",
          condition: (element, event) => ["Enter", " "].includes(event.key),
          action: (element, event) => {
            console.log({ msg: "closed", element, event });
          }
        }
      ]
    ],
  ],
});

document.body.setAttribute("data-state", "open");

document.body.addEventListener("keydown", (event) => {
  transitionDomEvent(testState, event, document.body);
});
