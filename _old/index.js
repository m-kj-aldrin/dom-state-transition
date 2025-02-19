import { machine } from "./simple-machine.js";

const m = machine(
  {
    open: {
      toggle: {
        newState: "closed",
      },
    },
    closed: {
      toggle: {
        newState: "closed",
      },
      force: {
        newState: "closed",
      },
    },
  },
  "open"
);

m.onChange("", (oldState, newState, event) => {
  console.log(`${oldState} -> ${event} -> ${newState}`);
});

m.onChange("force", (oldState, newState, event) => {
  console.log(`${oldState} -> ${event} -> ${newState}`);
});

m.transition("");
m.transition("force");
m.transition("force");
