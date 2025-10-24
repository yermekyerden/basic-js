const { NotImplementedError } = require('../lib');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect !== false;
  }

  encrypt(message, key) {
    return this.#process(message, key, true);
  }

  decrypt(message, key) {
    return this.#process(message, key, false);
  }

  #process(message, key, isEncrypt) {
    if (message === undefined || key === undefined)
      throw new Error('Incorrect arguments!');

    const m = String(message).toUpperCase();
    const k = String(key).toUpperCase();

    let res = '';
    let ki = 0;

    for (let i = 0; i < m.length; i++) {
      const ch = m[i];
      const code = ch.charCodeAt(0);

      if (code >= 65 && code <= 90) {
        const kc = k.charCodeAt(ki % k.length);
        const shift = kc - 65;

        const base = code - 65;
        const moved = isEncrypt
          ? (base + shift) % 26
          : (base - shift + 26) % 26;

        res += String.fromCharCode(moved + 65);
        ki++;
      } else {
        res += ch;
      }
    }

    if (!this.isDirect)
      res = res.split('').reverse().join('');

    return res;
  }
}

module.exports = {
  directMachine: new VigenereCipheringMachine(),
  reverseMachine: new VigenereCipheringMachine(false),
  VigenereCipheringMachine,
};
