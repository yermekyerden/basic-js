const { NotImplementedError } = require('../lib');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  const result = {};
  const list = Array.isArray(domains) ? domains : [];

  for (const d of list) {
    const parts = String(d).split('.').reverse();
    let key = '';

    for (const p of parts) {
      key += `.${p}`;
      result[key] = (result[key] || 0) + 1;
    }
  }

  return result;
}

module.exports = {
  getDNSStats
};
