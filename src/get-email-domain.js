const { NotImplementedError } = require('../lib');

/**
 * Given an email address, return it's domain.
 *
 * @param {String} email
 * @return {String}
 *
 * @example
 * For the input 'prettyandsimple@example.com', the output should be 'example.com'
 *
 */
function getEmailDomain(email) {
  const s = String(email);
  const i = s.lastIndexOf('@');

  return i === -1 ? '' : s.slice(i + 1);
}

module.exports = {
  getEmailDomain
};
