const isoDate = require('iso8601-convert');

module.exports = actual => ({
  toEqual: (expected) => {
    expect(actual.id).toBe(expected.id);
    expect(actual.artist).toBe(expected.artist);
    expect(actual.title).toBe(expected.title);
    expect(isoDate.toDate(actual.updatedAt).getTime() <= Date.now()).toBe(true);
  },
});
