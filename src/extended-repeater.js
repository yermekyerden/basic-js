const { NotImplementedError } = require('../lib');

/**
 * Create a repeating string based on the given parameters
 *
 * @param {String} str string to repeat
 * @param {Object} options options object
 * @return {String} repeating string
 *
 *
 * @example
 *
 * repeater('STRING', { repeatTimes: 3, separator: '**',
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */

function repeater(str, options) {
  const s = String(str);
  const opts = options || {};

  const repeatTimes = opts.repeatTimes ?? 1;
  const separator = opts.separator !== undefined ? String(opts.separator) : '+';

  const hasAddition = 'addition' in opts;
  const additionValue = hasAddition ? String(opts.addition) : '';
  const additionRepeatTimes = opts.additionRepeatTimes ?? 1;
  const additionSeparator = opts.additionSeparator !== undefined ? String(opts.additionSeparator) : '|';

  const additionBlock = hasAddition
    ? Array.from({ length: additionRepeatTimes }, () => additionValue).join(additionSeparator)
    : '';

  const unit = s + additionBlock;

  return Array.from({ length: repeatTimes }, () => unit).join(separator);
}

module.exports = {
  repeater
};
