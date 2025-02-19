// import { machine } from "./simple-machine";

// const m = machine(
//   {
//     open: {
//       toggle: {
//         newState: "closed",
//       },
//     },
//     closed: {
//       toggle: {
//         newState: "open",
//       },
//       force: {
//         newState: "open",
//       },
//     },
//   },
//   "open"
// );

// // Valid event name (inferred as "toggle" | "force")
// m.onChange("toggle", (oldState, newState, event) => {
//   console.log(`${oldState} -> ${event} -> ${newState}`);
// });

// m.transition("toggle"); // OK
// m.transition("force");  // OK

// // Uncommenting the line below will produce a type error:
// // m.transition("invalid"); // Error: Argument of type '"invalid"' is not assignable to parameter of type '"toggle" | "force"'

// // Also, if you mistakenly provide an invalid newState:
// // const invalid = machine(
// //   {
// //     open: {
// //       toggle: {
// //         newState: "invalid", // Error: "invalid" is not assignable to "open" | "closed"
// //       },
// //     },
// //     closed: {
// //       toggle: {
// //         newState: "open",
// //       },
// //     },
// //   },
// //   "open"
// // ); 