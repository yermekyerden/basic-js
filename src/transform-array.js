const { NotImplementedError } = require('../lib');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr))
    throw new Error("'arr' parameter must be an instance of the Array!");

  const res = [];
  const isControl = (v) =>
    v === '--discard-next' ||
    v === '--discard-prev' ||
    v === '--double-next' ||
    v === '--double-prev';

  let skipNext = false;
  let prevWasDiscarded = false;

  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i];

    if (skipNext) {
      skipNext = false;
      prevWasDiscarded = false;
      continue;
    }

    switch (cur) {
      case '--discard-next':
        if (i + 1 < arr.length) {
          skipNext = true;
        }
        prevWasDiscarded = false;
        break;

      case '--discard-prev':
        if (!prevWasDiscarded && res.length > 0) {
          res.pop();
        }
        prevWasDiscarded = false;
        break;

      case '--double-next':
        if (i + 1 < arr.length && !isControl(arr[i + 1])) {
          res.push(arr[i + 1]);
        }
        prevWasDiscarded = false;
        break;

      case '--double-prev':
        if (!prevWasDiscarded && res.length > 0) {
          res.push(res[res.length - 1]);
        }
        prevWasDiscarded = false;
        break;

      default:
        res.push(cur);
        prevWasDiscarded = false;
        break;
    }
  }

  return res;
}

module.exports = {
  transform
};
