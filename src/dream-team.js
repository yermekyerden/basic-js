const { NotImplementedError } = require('../lib');

/**
 * Create name of dream team based on the names of its members
 *
 * @param {Array} members names of the members
 * @return {String | Boolean} name of the team or false
 * in case of incorrect members
 *
 * @example
 *
 * createDreamTeam(['Matt', 'Ann', 'Dmitry', 'Max']) => 'ADMM'
 * createDreamTeam(['Olivia', 1111, 'Lily', 'Oscar', true, null]) => 'LOO'
 *
 */
function createDreamTeam(members) {
  if (!Array.isArray(members)) return false;

  const initials = members
    .filter(v => typeof v === 'string')
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(s => s[0].toUpperCase());

  return initials.sort().join('');
}

module.exports = {
  createDreamTeam
};
