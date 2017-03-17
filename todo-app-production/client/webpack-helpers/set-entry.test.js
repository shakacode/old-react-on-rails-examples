const setEntry = require('./set-entry');

describe('webpack-helpers/set-entry', () => {
  describe('chunk', () => {
    describe('when builderConfig.chunk is true', () => {
      const builderConfig = { deps: 'chunks' };

      it('returns an object with base entry points', () => {
        const actual = setEntry(builderConfig, {}).entry;
        expect(actual instanceof Object).toBe(true);
      });
    });
  });
});
