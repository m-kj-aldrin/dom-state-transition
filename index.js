import { machine } from "./machine.js";

const m = machine(
  {
    open: {
      toggle: {
        nextState: "closed",
      },
      move: {},
    },
    closed: {
      toggle: {
        nextState: "open",
      },
    },
  },
  "closed"
);

// m.onChange("change", (current, next) => {
//   console.log({ type: "change", current, next });
//   document.body.dataset.state = next;
// });

m.onChange("move", (current, next) => {
  console.log({ type: "move", current, next });
});

document.body.addEventListener("keydown", (e) => {
  if (e.key == "Enter" || e.key == " ") {
    m.transition("toggle");
  }
  if (e.key == "ArrowUp" || e.key == "ArrowDown") {
    m.transition("move");
  }
});
