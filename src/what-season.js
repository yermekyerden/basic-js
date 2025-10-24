const { NotImplementedError } = require('../lib');

/**
 * Extract season from given date and expose the enemy scout!
 *
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 *
 * @example
 *
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 *
 */
function getSeason(date) {
  if (arguments.length === 0) return 'Unable to determine the time of year!';

  try {
    if (!(date instanceof Date) || Object.getOwnPropertyNames(date).length > 0)
      throw new Error('Invalid date!');

    if (Number.isNaN(date.getTime()))
      throw new Error('Invalid date!');
  } catch {
    throw new Error('Invalid date!');
  }

  const m = date.getMonth();
  if (m === 11 || m === 0 || m === 1) return 'winter';
  if (m >= 2 && m <= 4) return 'spring';
  if (m >= 5 && m <= 7) return 'summer';
  return 'autumn';
}

module.exports = {
  getSeason
};
