// @ts-check

/**
 * @template {Record<string, unknown>} T
 * @typedef {Object} EventObject
 * @property {Extract<keyof T, string>} [newState]
 */

/**
 * @template {Record<string, unknown>} T
 * @typedef {Record<string, EventObject<T>>} StateObject
 */

/**
 * @template {Record<string, unknown>} T
 * @typedef {Record<keyof T, StateObject<T>>} MachineMap
 */

/**
 * @template U
 * @typedef {U extends any ? keyof U : never} DistributiveKeyof
 */

/**
 * @template {Record<string, unknown>} T
 * @typedef {Extract<DistributiveKeyof<MachineMap<T>[keyof T]>, string>} EventName
 */

/**
 * @template T of Record<string, unknown>
 * @typedef {T[keyof T] extends infer U ? (U extends object ? (keyof U & string) : never) : never} AllEvents
 */

/**
 * @template T of Record<string, unknown>
 * @typedef {Record<AllEvents<T>, { newState: Extract<keyof T, string> }>} EventTransitions
 */

/**
 * @template T of Record<string, unknown>
 * @callback Callback
 * @param {Extract<keyof T, string>} oldState
 * @param {Extract<keyof T, string>} newState
 * @param {AllEvents<T>} event
 * @returns {void}
 */

/**
 * Creates a state machine.
 *
 * Note that the machine's type parameter T represents the overall state definition. 
 * This ensures that newState is the union of the state keys and that event names are the union of all event keys.
 *
 * @template {Record<string, unknown>} T
 * @param {MachineMap<T>} map - The state transition definition.
 * @param {Extract<keyof T, string>} initialState - The initial state.
 * @returns {{
 *   transition: (event: AllEvents<T>) => void,
 *   onChange: (eventName: AllEvents<T>, callback: Callback<T>) => () => void
 * }}
 */
export function machine(map, initialState) {
  /** @type {Extract<keyof T, string>} */
  let _state = initialState;
  
  /** @type {Map<AllEvents<T>, Set<Callback<T>>>} */
  const _listeners = new Map();
  
  /**
   * Transitions the machine state based on an event.
   *
   * @param {AllEvents<T>} event
   */
  function transition(event) {
    /** @type {StateObject<T>} */
    const stateObject = map[_state];
    console.log(stateObject, _state);
    
    // Ensure that event is a valid key in stateObject
    if (!(event in stateObject)) return;
    
    /** @type {EventObject<T>} */
    const eventObject = stateObject[event];
    
    const oldState = _state;
    if (eventObject.newState) {
      _state = eventObject.newState;
    }
    
    const ref = _listeners.get(event);
    if (!ref) return;
    
    ref.forEach((callback) => callback(oldState, _state, event));
  }
  
  /**
   * Registers a callback for the provided event.
   *
   * @param {AllEvents<T>} eventName - The event to listen for.
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