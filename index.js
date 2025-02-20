import { machine } from "./machine.js";

const m = machine(
  {
    open: {
      toggle: { nextState: "closed" },
      move: {},
    },
    closed: {
      toggle: { nextState: "open" },
    },
  },
  "closed"
);

let idx = 0

m.onChange("change", (eventName, current, next, payload) => {
  document.body.dataset.state = next;
  document.getElementById("state").textContent = next;
  document.getElementById("event").textContent = eventName;
  document.getElementById("idx").textContent = (idx++).toString();
});

m.onChange("toggle", (current, next, payload) => {
  console.log({ type: "toggle", current, next, payload });
});

m.onChange("move", (current, next, payload) => {
  console.log({ type: "move", current, next, payload });
});

document.body.addEventListener("keydown", (e) => {
  if (e.key == "Enter" || e.key == " ") {
    m.transition("toggle");
  }
  if (e.key == "ArrowUp" || e.key == "ArrowDown") {
    m.transition("move", { direction: e.key == "ArrowUp" ? 1 : -1 });
  }
});
