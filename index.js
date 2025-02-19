// import { defineDomStateMap, transitionDomEvent } from "./dom-state.js";

import { keyboardModKeyMerge, stringMerger } from "./chain-filter.js";
import { eventFilter } from "./event-filter.js";
import { StateEvent, StateMachine } from "./event-target-state-machine.js";

// const testState = defineDomStateMap({
//   open: [
//     [
//       KeyboardEvent,
//       [
//         {
//           nextState: "closed",
//           condition: (element, event) => ["Enter", " "].includes(event.key),
//           action: (element, event) => {
//             console.log({ msg: "open", element, event });
//           }
//         },
//         {
//           condition: (element, event) => ["ArrowUp", "ArrowDown"].includes(event.key),
//           action: (element, event) => {
//             console.log({ msg: "move", element, event });
//           }
//         }
//       ]
//     ],
//   ],
//   closed: [
//     [
//       KeyboardEvent,
//       [
//         {
//           nextState: "open",
//           condition: (element, event) => ["Enter", " "].includes(event.key),
//           action: (element, event) => {
//             console.log({ msg: "closed", element, event });
//           }
//         }
//       ]
//     ],
//   ],
// });

// document.body.setAttribute("data-state", "open");

document.body.addEventListener("keydown", (event) => {
  // let key = event.key;
  // let enterSpace = ["Enter", " "].includes(key);
  // let arrowUpDown = ["ArrowUp", "ArrowDown"].includes(key);
  // let tab = key === "Tab";
  // let result = eventFilter(event, KeyboardEvent, (event) =>
  //   ["Enter", " "].includes(event.key)
  // );
  // if (result) {
  //   console.log(result);
  //   result.preventDefault();
  // }
});

// const testEvent = new Event("test");

// let event = eventFilter(testEvent, KeyboardEvent, (event) =>
//   ["Enter", " "].includes(event.key)
// );

// console.log(event);

// let result = chainFilter(
//   ["Enter", " ", "ArrowUp", "ArrowDown", "Tab"],
//   (input) => {
//     return input.filter((item) => item === "Enter" || item === " ");
//   },
//   (input) => {
//     return input.filter((item) => item === "ArrowUp" || item === "ArrowDown");
//   },
//   (input) => {
//     return input.filter((item) => item === "Tab");
//   }
// );

// console.log(result);

// document.body.addEventListener("keydown", (event) => {
//   let key = keyboardModKeyMerge(event);

//   let result = stringMerger(
//     key,
//     { name: "Toggle", conditions: ["Enter", " "] },
//     {
//       name: "Move",
//       conditions: ["ArrowUp:-1", "ArrowDown:1", "Tab:1", "TabShift:1"],
//     }
//   );

//   if (result) {
//     event.preventDefault();
//     console.log(result);
//   }
// });

const stateMachine = new StateMachine("state-open", {
  "state-open": {
    newState: "state-closed",
    action: (state) => {
      console.log(state);
    },
  },
  "state-closed": {
    newState: "state-open",
    action: (state) => {
      console.log(state);
    },
  },
});

stateMachine.dispatchEvent(new StateEvent("state-open"));

stateMachine.addEventListener("state-closed", (event) => {
  event.type == ''
}
