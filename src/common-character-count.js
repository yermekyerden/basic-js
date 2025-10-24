const { NotImplementedError } = require('../lib');

/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */

function getCommonCharacterCount(s1, s2) {
  const a = String(s1);
  const b = String(s2);

  const freq = Object.create(null);
  for (const ch of a) freq[ch] = (freq[ch] || 0) + 1;

  let common = 0;
  for (const ch of b) {
    if (freq[ch] > 0) {
      common += 1;
      freq[ch] -= 1;
    }
  }

  return common;
}

module.exports = {
  getCommonCharacterCount
};
