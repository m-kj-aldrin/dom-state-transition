/** @typedef {Record<string,unknown>} Base */

/**
 * @template T
 * @typedef { { [K in keyof T]: keyof T[K] }[keyof T] } EventNames
 */

/**
 * @template T
 * @template Ctx
 * @typedef {Object} EventObject
 * @property {keyof T} [nextState]
 * @property {(context:Ctx)=>void} [action]
 */

/**
 * @template T
 * @template Ctx
 * @typedef { { [K in keyof T]: { [E in keyof T[K]]: EventObject<T,Ctx> } } } StateMap
 */

/**
 * @typedef {Object} Payload
 */

/**
 * @template T
 * @typedef {(currentState:T,nextState:T,payload:Payload)=>void} CallBack
 */

/**
 * @template T
 * @template K
 * @typedef {Map<T,Set<CallBack<K>>>} Listeners
 */

/**
 * @template {Base} T
 * @template Ctx
 * @param {Ctx} context
 * @param {StateMap<T,Ctx>} stateMap
 * @param {keyof T} intialState
 */
export function machine(context, stateMap, intialState) {
  let state = intialState;

  /**@type {Listeners<EventNames<T> | "change",keyof T>} */
  let listeners = new Map();
  listeners.set("change", new Set());

  /**
   * @param {EventNames<T>} eventName
   * @param {Payload} payload
   *
   */
  function transition(eventName, payload = {}) {
    const stateObject = stateMap[state];
    const eventObject = stateObject[eventName];

    if (!eventObject) return false;

    let currentState = state;

    if (eventObject.nextState) {
      state = eventObject.nextState;
    }

    _listeners.forEach((callback) => callback(state, eventName, context));

    if (eventObject.action) {
      eventObject.action(context);
    }

    // let changeHandlers = listeners.get("change");
    // changeHandlers.forEach((callback) =>
    //   callback(eventName, currentState, state, payload)
    // );

    // let namedHandlers = listeners.get(eventName);
    // namedHandlers?.forEach((callback) =>
    //   callback(currentState, state, payload)
    // );
  }

  // /**
  //  * @param {EventNames<T> | "change"} eventName
  //  * @param {CallBack<keyof T>} callback
  //  */
  // function onChange(eventName, callback) {
  //   let ref = listeners.get(eventName);

  //   if (!ref) {
  //     ref = new Set();
  //     listeners.set(eventName, ref);
  //   }

  //   ref.add(callback);

  //   return () => ref.delete(callback);
  // }

  /**@type {Set<(_state:typeof state,event:EventNames<T>,context:Ctx)=>void>} */
  let _listeners = new Set();

  /**
   * @param {(_state:typeof state,event:EventNames<T>,context:Ctx)=>void} callback
   */
  function onChange(callback) {
    _listeners.add(callback);
  }

  return {
    transition,
    onChange,
  };
}

/**
 * @template {`${string}:${string}`} S
 * @param {...S} aliasArr
 * @returns {<K extends S extends `${infer Key}:${string}` ? Key : string>(
 *   name: K
 * ) => Extract<S extends `${K}:${infer V}` ? V : never, string>}
 */
export function alias(...aliasArr) {
  /** @type {Record<string, string>} */
  let names = aliasArr.reduce((acc, alias) => {
    let [name, event] = alias.split(":");
    acc[name] = event;
    return acc;
  }, {});

  return (name) => names[name];
}
