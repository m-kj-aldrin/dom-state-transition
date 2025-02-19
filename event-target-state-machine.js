/** @template {string} T */
export class StateEvent extends Event {
  /** @type {StateString<T>} */
  type;

  /** @param {T} name */
  constructor(name) {
    super(`state-${name}`);
  }
}

/**
 * @template {string} T
 * @typedef {`state-${T}`} StateString */

/**
 * @typedef {Object} StateObject
 * @property {StateString<string>} [newState]
 * @property {(state:StateString<string>)=>void} [action]
 */

/**
 * @typedef {Record<StateString<string>, StateObject>} StateMap
 */

/**
 * @template {StateMap} T
 */
export class StateMachine extends EventTarget {
  #state;

  /** @type {T} */
  #stateMap;

  /**
   * @param {keyof T} intialState
   * @param {T} stateMap
   */
  constructor(intialState, stateMap) {
    super();
    this.#state = intialState;
    this.#stateMap = stateMap;

    this.addEventListener("statechange", (event) => {
      if (!(event instanceof StateEvent)) return;

      const eventObject = this.#stateMap[event.type];
      if (!eventObject) return false;

      if (eventObject.newState) this.#state = eventObject.newState;

      eventObject.action?.(this.#state);

      console.log(`${this.#state} -> ${event.newState}`);
    });
  }

  /**
   * @param {StateEvent<keyof T>} event
   */
  dispatchEvent(event) {
    return super.dispatchEvent(event);
  }

  /**
   * @template {keyof T} T
   * @param {T} type
   * @param {StateHandler<keyof T>} callback
   * @param {AddEventListenerOptions | boolean} [options]
   * @returns {void}
   */
  addEventListener(type, callback, options) {
    return super.addEventListener(type, callback, options);
  }
}

/**
 * @template {string} T
 * @typedef {(event:StateEvent<T>)=>void} StateHandler */
