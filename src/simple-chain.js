const { decorateObject } = require('../lib');
const { NotImplementedError } = require('../lib');

/**
 * Implement chainMaker object according to task description
 *
 */
const chainMaker = {
  _links: [],

  getLength() {
    return chainMaker._links.length;
  },

  addLink(value) {
    const display = (value === undefined) ? '' : String(value);
    chainMaker._links.push(display);
    return chainMaker;
  },

  removeLink(position) {
    const n = chainMaker._links.length;
    if (!Number.isInteger(position) || position < 1 || position > n) {
      chainMaker._links = [];
      throw new Error("You can't remove incorrect link!");
    }
    chainMaker._links.splice(position - 1, 1);
    return chainMaker;
  },

  reverseChain() {
    chainMaker._links.reverse();
    return chainMaker;
  },

  finishChain() {
    const result = chainMaker._links.map(v => `( ${v} )`).join('~~');
    chainMaker._links = [];
    return result;
  },
};

module.exports = {
  chainMaker,
};
