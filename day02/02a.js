'use strict';
const _ = require('lodash');

const limits = {
  'lower': 1,
  'upper': 3
};

const directions = {
  'L': -1,
  'R': 1,
  'U': -1,
  'D': 1
};

function keypad(input) {
  let result = _(input).chain()
  .split('\r\n')
  .reduce((code, moves) => {
    let key = _(moves)
    .chain()
    .split('')
    .reduce((keyTracker, keypadVal) => {
      let delta = directions[keypadVal];
      let axis = keypadVal === 'U' || keypadVal === 'D' ? 'y' : 'x';
      let changeTo = delta > 0 ? Math.min(keyTracker[axis] + delta, limits.upper) : Math.max(keyTracker[axis] + delta, limits.lower);

      keyTracker[axis] = changeTo;

      return keyTracker;
    }, {x: 1, y: 1})
    .value();
    code.push(key);
    return code;
  }, [])
  .reduce((sequence, keypress) => {
    sequence.push((limits.upper * keypress.y) - (limits.upper - keypress.x));
    return sequence;
  }, [])
  .value();
  return result;
}

module.exports = keypad;