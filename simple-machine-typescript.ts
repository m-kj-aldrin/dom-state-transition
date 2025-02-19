// // Each event object can transition to any of the defined states
// export type EventObject<TStates extends string> = {
//   newState?: TStates;
// };

// // Each state can define any number of events
// export type StateObject<TStates extends string> = {
//   [eventName: string]: EventObject<TStates>;
// };

// // The machine map requires each state to define its events.
// // The keys here are the valid state names.
// export type MachineMap<TStates extends string> = {
//   [State in TStates]: StateObject<TStates>;
// };

// // Helper type to extract event names from a specific state
// export type StateEventNames<T, State extends keyof T> = keyof T[State];

// // Get all possible event names from the machine map (i.e. union of the event keys of each state)
// export type GetEventNames<T> = {
//   [K in keyof T]: StateEventNames<T, K>;
// }[keyof T];

// export type Callback<TStates extends string, TEvents extends string> = (
//   oldState: TStates,
//   newState: TStates,
//   event: TEvents
// ) => void;

// /**
//  * Creates a state machine.
//  *
//  * The machine map keys determine the valid state names and each event's newState must be one of these states.
//  *
//  * @param map - The machine map. Example:
//  * @param initialState - The initial state (must be a key of the map)
//  */
// export function machine<TMap extends Record<string, StateObject<keyof TMap & string>>>(
//   map: TMap,
//   initialState: keyof TMap & string
// ) {
//   type TStates = keyof TMap & string;
//   type TEvents = GetEventNames<TMap> & string;

//   let _state: TStates = initialState;
//   const _listeners = new Map<TEvents, Set<Callback<TStates, TEvents>>>();

//   function transition(event: TEvents) {
//     const stateObject = map[_state];
//     console.log(stateObject, _state);

//     const eventObject = stateObject[event];
//     if (!eventObject) return;

//     const oldState = _state;
//     if (eventObject.newState) {
//       _state = eventObject.newState;
//     }

//     const ref = _listeners.get(event);
//     if (!ref) return;

//     ref.forEach((callback) => callback(oldState, _state, event));
//   }

//   function onChange(
//     eventName: TEvents,
//     callback: Callback<TStates, TEvents>
//   ): () => void {
//     let ref = _listeners.get(eventName);
//     if (!ref) {
//       ref = new Set();
//       _listeners.set(eventName, ref);
//     }

//     ref.add(callback);
//     return () => ref.delete(callback);
//   }

//   return {
//     transition,
//     onChange,
//   };
// } 