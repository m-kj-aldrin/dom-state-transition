/**
 * @typedef {new (...args: any[]) => Event} EventConstructor
 */

/**
 * @template T
 * @param {Event} event
 * @param {new (...args: any[]) => T} instace
 * @param {(event:T)=>boolean} [filterCallback]
 * @returns {T | null}
 */
export function eventFilter(event, instace, filterCallback) {
  if (event instanceof instace) {
    if (filterCallback) {
      if (filterCallback(event)) {
        return event;
      } else {
        return null;
      }
    }
    return event;
  }
  return null;
}
