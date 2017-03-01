const _ = require('lodash/fp');

const setEntry = require('./set-entry');

describe('webpack-helpers/set-entry', () => {
  describe('developerAids', () => {
    describe('when builderConfig.developerAids is true', () => {
      const builderConfig = { chunk: true, developerAids: true };

      it('uses adds "react-addons-perf" entry to vendor', () => {
        const expected = [expect.stringMatching('react-addons-perf')];
        const actual = setEntry(builderConfig, {}).entry.vendor;

        expect(actual).toEqual(expect.arrayContaining(expected));
      });
    });
  });

  describe('extractText', () => {
    describe('when builderConfig.extractText is false', () => {
      const builderConfig = { chunk: true, extractText: false };

      it('uses basic bootstrap loader', () => {
        const expected = [expect.stringMatching('bootstrap-loader')];
        const actual = setEntry(builderConfig, {}).entry.vendor;

        expect(actual).toEqual(expect.arrayContaining(expected));
      });
    });

    describe('when builderConfig.extractText is true', () => {
      const builderConfig = { chunk: true, extractText: true };

      it('uses bootstrap extract-styles loader', () => {
        const expected = [expect.stringMatching('bootstrap-loader/extractStyles')];
        const actual = setEntry(builderConfig, {}).entry.vendor;

        expect(actual).toEqual(expect.arrayContaining(expected));
      });
    });
  });

  describe('hmr', () => {
    describe('when builderConfig.hmr is true', () => {
      const builderConfig = { chunk: true, hmr: true };

      it('is not empty', () => {
        const actual = _.size(setEntry(builderConfig, {}).entry);

        expect(actual).toBeGreaterThan(0);
      });

      it('prefixes HMR locations to any non-vendor entries', () => {
        const devServerRegEx = /webpack-dev-server\/client\?http:\/\/lvh\.me:\d\d\d\d/;
        const hot = 'webpack/hot/only-dev-server';

        const entryConfig = setEntry(builderConfig, {});
        const entries = _.toPairs(entryConfig.entry);

        expect(entries.length).toBeGreaterThan(0);

        const assertIsValidEntry = entry => {
          const [entryName, entryLocations] = entry;

          if (entryName === 'vendor') return; // vendor stuff isn't hot-reloaded

          const [location1, location2] = entryLocations;

          expect(location1).toMatch(devServerRegEx);
          expect(location2).toBe(hot);
        };

        _.forEach(assertIsValidEntry, entries);
      });
    });
  });

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
