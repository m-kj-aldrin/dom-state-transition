import { alias, machine } from "./machine.js";

const m = machine(
  {
    stateEl: document.getElementById("state"),
    eventEl: document.getElementById("event"),
    idxEl: document.getElementById("idx"),
    boxEl: /** @type {HTMLElement} */ (document.querySelector(".box")),
  },
  {
    open: {
      toggle: {
        nextState: "closed",
        action: (context) => {
          context.boxEl.style.backgroundColor = "red";
        },
      },
      moveUp: {
        action: (context) => {
          let y = +context.boxEl.style.getPropertyValue("--y").split("px")[0];
          let x = +context.boxEl.style.getPropertyValue("--x").split("px")[0];

          context.boxEl.style.setProperty("--y", `${y - 10}px`);
          context.boxEl.style.setProperty("--x", `${x}px`);
        },
      },
      moveDown: {
        action: (context) => {
          let y = +context.boxEl.style.getPropertyValue("--y").split("px")[0];
          let x = +context.boxEl.style.getPropertyValue("--x").split("px")[0];

          context.boxEl.style.setProperty("--y", `${y + 10}px`);
          context.boxEl.style.setProperty("--x", `${x}px`);
        },
      },
    },
    closed: {
      toggle: {
        nextState: "open",
        action: (context) => {
          context.boxEl.style.backgroundColor = "green";
        },
      },
    },
  },
  "open"
);

m.onChange((state, event, context) => {
  context.stateEl.textContent = state;
  context.eventEl.textContent = event;
});

let a = alias(
  "default:null",
  "ArrowUp:moveUp",
  "ArrowDown:moveDown",
  "Tab:moveDown",
  "TabShift:moveUp",
  "Enter:toggle",
  " :toggle"
);

let result = a("bla");

result == null;

m.transition(result);

// document.body.addEventListener("keydown", (e) => {
//   let event = a("ArrowDown");
//   if (event) m.transition(event);
// });
