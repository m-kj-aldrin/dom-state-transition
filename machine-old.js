// /** @typedef {Record<string,unknown>} Base */

// /**
//  * @template T
//  * @typedef { { [K in keyof T]: keyof T[K] }[keyof T] } EventNames
//  */

// /**
//  * @template T
//  * @typedef {Object} EventObject
//  * @property {keyof T} [nextState]
//  * @property {(payload:Payload)=>void} [action]
//  */

// /**
//  * @template T
//  * @typedef { { [K in keyof T]: { [E in keyof T[K]]: EventObject<T> } } } StateMap
//  */

// /**
//  * @typedef {Object} Payload
//  */

// /**
//  * @template T
//  * @typedef {(currentState:T,nextState:T,payload:Payload)=>void} CallBack
//  */

// /**
//  * @template T
//  * @template K
//  * @typedef {Map<T,Set<CallBack<K>>>} Listeners
//  */

// /**
//  * @template {Base} T
//  * @param {StateMap<T>} stateMap
//  * @param {keyof T} intialState
//  */
// export function machine(stateMap, intialState) {
//   let state = intialState;

//   /**@type {Listeners<EventNames<T> | "change",keyof T>} */
//   let listeners = new Map();
//   listeners.set("change", new Set());

//   /**
//    * @param {EventNames<T>} eventName
//    * @param {Payload} payload
//    *
//    */
//   function transition(eventName, payload = {}) {
//     const stateObject = stateMap[state];
//     const eventObject = stateObject[eventName];

//     if (!eventObject) return false;

//     let currentState = state;

//     if (eventObject.nextState) {
//       state = eventObject.nextState;
//     }

//     if (eventObject.action) {
//       eventObject.action(payload);
//     }

//     let changeHandlers = listeners.get("change");
//     changeHandlers.forEach((callback) =>
//       callback(currentState, state, payload)
//     );

//     let namedHandlers = listeners.get(eventName);
//     namedHandlers?.forEach((callback) =>
//       callback(currentState, state, payload)
//     );
//   }

//   /**
//    * @param {EventNames<T> | "change"} eventName
//    * @param {CallBack<keyof T>} callback
//    */
//   function onChange(eventName, callback) {
//     let ref = listeners.get(eventName);

//     if (!ref) {
//       ref = new Set();
//       listeners.set(eventName, ref);
//     }

//     ref.add(callback);

//     return () => ref.delete(callback);
//   }

//   return {
//     transition,
//     onChange,
//   };
// }
