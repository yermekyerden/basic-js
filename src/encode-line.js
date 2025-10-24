const { NotImplementedError } = require('../lib');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */

function encodeLine(str) {
  const s = String(str);
  if (s.length === 0) return '';

  let out = '';
  let count = 1;

  for (let i = 1; i <= s.length; i++) {
    const prev = s[i - 1];
    const cur = s[i];

    if (cur === prev) {
      count += 1;
    } else {
      out += (count > 1 ? String(count) : '') + prev;
      count = 1;
    }
  }

  return out;
}

module.exports = {
  encodeLine
};
