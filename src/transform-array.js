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
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  const res = [];
  const pushedIdx = [];

  const isControl = (v) =>
    v === '--discard-next' ||
    v === '--discard-prev' ||
    v === '--double-next' ||
    v === '--double-prev';

  let skipNext = false;

  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i];

    if (skipNext) {
      skipNext = false;
      continue;
    }

    if (!isControl(cur)) {
      res.push(cur);
      pushedIdx.push(i);
      continue;
    }

    switch (cur) {
      case '--discard-next':
        if (i + 1 < arr.length) {
          skipNext = true;
        }
        break;

      case '--discard-prev': {
        const lastEmittedIdx = pushedIdx[pushedIdx.length - 1];
        if (lastEmittedIdx === i - 1) {
          res.pop();
          pushedIdx.pop();
        }
        break;
      }

      case '--double-next':
        if (i + 1 < arr.length && !isControl(arr[i + 1])) {
          res.push(arr[i + 1]);
          pushedIdx.push(i + 1);
        }
        break;

      case '--double-prev': {
        const lastEmittedIdx = pushedIdx[pushedIdx.length - 1];
        if (lastEmittedIdx === i - 1) {
          res.push(arr[i - 1]);
          pushedIdx.push(i - 1);
        }
        break;
      }
    }
  }

  return res;
}

module.exports = {
  transform
};
