/**
 * @typedef {Object} DomEventObject
 * @property {string} [nextState]
 * @property {(element: HTMLElement, event: Event) => boolean} [condition]
 * @property {(element: HTMLElement, event: Event) => void} [action]
 */

/**
 * A generic Event constructor that returns an Event instance.
 * @typedef {new (type: string, eventInitDict?: EventInit) => Event} EventConstructor
 */

/**
 * @typedef {Object<string, [EventConstructor, DomEventObject[]][]>} DomEventState
 */

/**
 * @typedef {Object<string, Map<EventConstructor, DomEventObject[]>>} DomEventStateMapObject
 */

/**
 * @param {DomEventState} stateMap
 * @returns {DomEventStateMapObject}
 */
export function defineDomStateMap(stateMap) {
  // Create an object to hold state -> event maps
  /**@type {DomEventStateMapObject} */
  const stateEventMaps = {};

  // For each state in the input stateMap
  for (const [state, events] of Object.entries(stateMap)) {
    // Create a new Map for this state
    const eventMap = new Map();

    // Add each event and its handler array to this state's map
    for (const [event, handlers] of events) {
      eventMap.set(event, handlers);
    }

    // Add this state's event map to our result object
    stateEventMaps[state] = eventMap;
  }

  return stateEventMaps;
}
// const testState = defineDomStateMap({
//   open: [
//     [
//       KeyboardEvent,
//       {
//         nextState: "closed",
//         action: (element, event) => {
//           console.log("closed");
//         },
//       },
//     ],
//   ],
//   closed: [
//     [
//       KeyboardEvent,
//       {
//         nextState: "open",
//         action: (element, event) => {
//           console.log("open");
//         },
//       },
//     ],
//   ],
// });

/**
 *
 * @param {DomEventStateMapObject} stateMap
 * @param {Event} event
 * @param {HTMLElement} element
 * @param {string} attributeName
 */
export function transitionDomEvent(stateMap, event, element, attributeName = "data-state") {
  const currentState = element.getAttribute(attributeName);
  if (!currentState) return false;

  const stateEventMap = stateMap[currentState];
  if (!stateEventMap) return false;

  const eventConstructor = /** @type {EventConstructor} */ (event.constructor);
  const handlers = stateEventMap.get(eventConstructor); // handlers is an array of DomEventObject

  if (!handlers) return false;

  // Iterate over all handlers and execute the first one that matches (condition passes)
  for (const handler of handlers) {
    // If a condition is defined and it fails, try the next handler
    if (handler.condition && !handler.condition(element, event)) {
      continue;
    }
    // Execute the action if provided
    if (handler.action) {
      handler.action(element, event);
    }
    // If nextState is defined, update our element's attribute and return the new state
    if (handler.nextState) {
      element.setAttribute(attributeName, handler.nextState);
      return handler.nextState;
    }
    // If no nextState provided, simply return the current state after executing the action
    return currentState;
  }
  return currentState;
}
