// @flow
const path = require('path');

const setContext = require('./set-context');

describe('webpack-helpers/set-context', () => {
  it('returns an object with context set to client folder', () => {
    const expected = path.resolve(__dirname, '..');
    const actual = setContext({}, {}).context;
    expect(actual).toBe(expected);
  });
});
