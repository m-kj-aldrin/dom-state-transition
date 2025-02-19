// /**
//  * @template T
//  * @param {T} input
//  * @param  {...((input:T)=>T)} filters
//  */
// export function chainFilter(input, ...filters) {
//   let result = input;
//   for (let filter of filters) {
//     let _result = filter(result);
//     if (_result) {
//       result = _result;
//     } else {
//       return result;
//     }
//   }
//   return result;
// }

/**
 *
 * @param {string} input
 * @param  {...{name:string,conditions:string[]}} filters
 */
export function stringMerger(input, ...filters) {
  for (let filter of filters) {
    let [key, value] = input.split(":");
    if (filter.conditions.includes(key)) {
      return { name: filter.name, value: value };
    }
  }
  return null;
}

/**
 *
 * @param {KeyboardEvent} event
 */
export function keyboardModKeyMerge(event) {
  let shift = event.shiftKey ? "Shift" : "";
  let ctrl = event.ctrlKey ? "Ctrl" : "";
  let alt = event.altKey ? "Alt" : "";
  let meta = event.metaKey ? "Meta" : "";
  let key = event.key;

  if (key == shift) return "Shift";
  if (key == ctrl) return "Ctrl";
  if (key == alt) return "Alt";
  if (key == meta) return "Meta";

  return `${key}${shift}${ctrl}${alt}${meta}`;
}
