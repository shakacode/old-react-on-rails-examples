const _ = require('lodash/fp');

const setEntry = require('./set-entry');

describe('webpack-helpers/set-entry', () => {
  describe('chunk', () => {
    describe('when builderConfig.chunk is true', () => {
      const builderConfig = { chunk: true };

      it('returns an object with base entry points', () => {
        const actual = setEntry(builderConfig, {}).entry;
        expect(actual instanceof Object).toBe(true);
      });
    });

    describe('when builderConfig.chunk is false', () => {
      const builderConfig = { chunk: false };

      it('returns a simple string pointing to the server entry file', () => {
        const actual = setEntry(builderConfig, {}).entry;
        expect(typeof actual).toBe('string');
      });
    });
  });
});
