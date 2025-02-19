/**
 * @typedef {Object} DomEventObject
 * @property {string} [nextState]
 * @property {(element: HTMLElement, event: Event) => void} [action]
 */

/**
 * A generic Event constructor that returns an Event instance.
 * @typedef {new (type: string, eventInitDict?: EventInit) => Event} EventConstructor
 */

/**
 * @typedef {Object<string, [EventConstructor,DomEventObject][]>} DomEventState
 */

/**
 * @typedef {Object<string, Map<EventConstructor,DomEventObject>>} DomEventStateMapObject
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

    // Add each event and its object to this state's map
    for (const [event, object] of events) {
      eventMap.set(event, object);
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
  const eventObject = stateEventMap.get(eventConstructor);

  // console.log({ eventObject });

  if (!eventObject) return false;

  if (eventObject.condition) {
    if (!eventObject.condition(element, event)) return false;
  }

  if (eventObject.action) {
    eventObject.action(element, event);
  }
  if (!eventObject.nextState) {
    return currentState;
  }

  element.setAttribute(attributeName, eventObject.nextState);
  return eventObject.nextState;
}
