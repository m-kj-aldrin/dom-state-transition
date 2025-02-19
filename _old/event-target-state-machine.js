/** @template {string} T */
export class StateEvent extends Event {
  /**@type {T} */
  #name;

  /**
   * @param {T} name
   */
  constructor(name) {
    super("statechange");
    this.#name = name;
  }

  get type() {
    return /** @type {"statechange"} */ (super.type);
  }

  get name() {
    return this.#name;
  }
}

/**
 * @template {string} T
 * @typedef {`state-${T}`} StateString */

/**
 * @typedef {Object} StateObject
 * @property {string} [newState]
 * @property {(state:StateEvent<string>)=>void} [action]
 */

/**
 * @typedef {Record<string, StateObject>} StateMap
 */

/**
 * @template {StateMap} T
 */
export class StateMachine extends EventTarget {
  /** @type {keyof T } */
  #state;

  /** @type {T} */
  #stateMap;

  /**
   * @param {keyof T} intialState
   * @param {T} stateMap
   */
  constructor(intialState, stateMap) {
    super();
    this.#state = /** @type {keyof T & StateString<string>} */ (intialState);
    this.#stateMap = stateMap;

    super.addEventListener(
      "statechange",
      /** @param {StateEvent<string>} event */ (event) => {
        if (!(event instanceof StateEvent)) return;

        const stateObject = this.#stateMap[this.#state];

        const eventObject = stateObject[event.name];
        if (!eventObject) return false;

        if (eventObject.newState) this.#state = eventObject.newState;

        eventObject.action?.(event);

        // console.log(`${this.#state} -> ${String(event.newState)}`);
      }
    );
  }

  get state() {
    return this.#state;
  }

  /**
   * @param {StateEvent<string>} event
   */
  dispatchEvent(event) {
    return super.dispatchEvent(event);
  }

  /**
   * @param {"statechange"} type
   * @param {StateHandler<string>} callback
   * @param {AddEventListenerOptions | boolean} [options]
   * @returns {void}
   */
  addEventListener(type, callback, options) {
    return super.addEventListener(type, callback, options);
  }
}

/**
 * @template {string} U
 * @typedef {(event: StateEvent<U>)=>void} StateHandler
 */
