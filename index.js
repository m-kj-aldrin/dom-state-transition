import { machine } from "./machine.js";

const m = machine(
  {
    open: {
      toggle: {
        nextState: "closed",
      },
    },
    closed: {
      toggle: {
        nextState: "open",
      },
    },
  },
  "closed"
);

m.onChange("change", (current, next) => {
  console.log({ type: "change", current, next });
});

m.transition("toggle")
m.transition("toggle")
