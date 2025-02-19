/**
 * @template U
 * @typedef {U extends any ? keyof U : never} DistributiveKeyof
 */

/**
 * @template {Record<string, unknown>} T
 * @typedef {Object} EventObject
 * @property {Extract<keyof T,string>} [newState]
 */

/**
 * @template {Record<string, unknown>} T
 * @typedef {Record<string, EventObject<T>>} StateObject
 */

/**
 * Use the keys from T (rather than arbitrary strings) to define the machine map.
 * For example, if T is { stateA: any, stateB: any }, then:
 *   MachineMap<T> becomes: { stateA: StateObject<T>, stateB: StateObject<T> }
 *
 * @template {Record<string, unknown>} T
 * @typedef {Record<keyof T, StateObject<T>>} MachineMap
 */

/**
 * Utility type to convert a union to an intersection.
 *
 * @template T
 * @typedef {(T extends any ? (x: T) => void : never) extends (x: infer R) => void
 *           ? R : never} UnionToIntersection
 */

/**
 * Here we want the event name to be the union of the keys of all the state objects.
 * Because MachineMap<T>[keyof T] is a union of StateObject<T> types, applying UnionToIntersection
 * turns that union into an intersection. Taking keyof of that intersection then yields a union of keys.
 *
 * @template {Record<string, unknown>} T
 * @typedef {Extract<DistributiveKeyof<MachineMap<T>[keyof T]>, string>} EventName
 */

/**
 * A callback receives the old and new state (which are guaranteed to be among the keys of T)
 * plus the event name.
 *
 * @template {Record<string, unknown>} T
 * @typedef {(oldState: Extract<keyof T, string>, newState: Extract<keyof T, string>, event: EventName<T>) => void} Callback
 */

/**
 * Creates your state machine.
 *
 * Note that the machine's type parameter T represents the overall "state definition."
 * That type is used to "mirror" the allowed state names: the MachineMap<T> is defined as having keys
 * \(\texttt{keyof T}\) and the newState property is typed as \(\texttt{keyof T}\).
 *
 * @template {Record<string, unknown>} T
 * @param {MachineMap<T>} map
 * @param {Extract<keyof T, string>} initialState
 */
export function machine(map, initialState) {
  let _state = initialState;

  /** @type {Map<EventName<T>, Set<Callback<T>>>} */
  let _listeners = new Map();

  /**
   * Transitions the machine state based on an event.
   *
   * @param {EventName<T>} event
   */
  function transition(event) {
    /** @type {StateObject<T>} */
    let stateObject = map[_state];
    console.log(stateObject, _state);

    /** @type {EventObject<T>|undefined} */
    let eventObject = stateObject[/** @type {string} */ (event)];
    if (!eventObject) return;

    let oldState = _state;
    if (eventObject.newState) {
      // newState is automatically typed as keyof T.
      _state = eventObject.newState;
    }

    let ref = _listeners.get(event);
    if (!ref) return;

    ref.forEach((callback) => callback(oldState, _state, event));
  }

  /**
   * Registers a callback for the provided event.
   *
   * @param {EventName<T>} eventName - The event to listen for.
   * @param {Callback<T>} callback - The callback to be invoked when the event fires.
   * @returns {() => void} A function that, when called, removes the listener.
   */
  function onChange(eventName, callback) {
    let ref = _listeners.get(eventName);
    if (!ref) {
      ref = new Set();
      _listeners.set(eventName, ref);
    }

    ref.add(callback);
    return () => ref.delete(callback);
  }

  return {
    transition,
    onChange,
  };
}
