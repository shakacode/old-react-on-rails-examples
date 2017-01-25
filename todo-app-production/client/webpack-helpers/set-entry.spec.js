const { assert } = require('chai');
const _ = require('lodash/fp');

const setEntry = require('./set-entry');

describe('webpack-helpers/set-entry', () => {
  describe('developerAids', () => {
    context('when builderConfig.developerAids is true', () => {
      const builderConfig = { chunk: true, developerAids: true };

      it('uses adds "react-addons-perf" entry to vendor', () => {
        const expected = 'react-addons-perf';
        const actual = setEntry(builderConfig, {}).entry.vendor;

        assert.include(actual, expected);
      });
    });
  });

  describe('extractText', () => {
    context('when builderConfig.extractText is false', () => {
      const builderConfig = { chunk: true, extractText: false };

      it('uses basic bootstrap loader', () => {
        const expected = 'bootstrap-loader';
        const actual = setEntry(builderConfig, {}).entry.vendor;

        assert.include(actual, expected);
      });
    });

    context('when builderConfig.extractText is true', () => {
      const builderConfig = { chunk: true, extractText: true };

      it('uses bootstrap extract-styles loader', () => {
        const expected = 'bootstrap-loader/extractStyles';
        const actual = setEntry(builderConfig, {}).entry.vendor;

        assert.include(actual, expected);
      });
    });
  });

  describe('hmr', () => {
    context('when builderConfig.hmr is true', () => {
      const builderConfig = { chunk: true, hmr: true };

      it('is not empty', () => {
        const actual = _.size(setEntry(builderConfig, {}).entry);

        assert.isAbove(actual, 0);
      });

      it('prefixes HMR locations to any non-vendor entries', () => {
        const devServerRegEx = /webpack-dev-server\/client\?http:\/\/lvh\.me:\d\d\d\d/;
        const hot = 'webpack/hot/only-dev-server';

        const entryConfig = setEntry(builderConfig, {});
        const entries = _.toPairs(entryConfig.entry);

        assert.isAbove(entries.length, 0);

        const assertIsValidEntry = (entry) => {
          const [entryName, entryLocations] = entry;

          if (entryName === 'vendor') return; // vendor stuff isn't hot-reloaded

          const [location1, location2] = entryLocations;

          assert.match(location1, devServerRegEx);
          assert.equal(location2, hot);
        };

        _.forEach(assertIsValidEntry, entries);
      });
    });
  });

  describe('chunk', () => {
    context('when builderConfig.chunk is true', () => {
      const builderConfig = { chunk: true };

      it('returns an object with base entry points', () => {
        const actual = setEntry(builderConfig, {}).entry;
        assert.isObject(actual);
      });
    });

    context('when builderConfig.chunk is false', () => {
      const builderConfig = { chunk: false };

      it('returns a simple string pointing to the server entry file', () => {
        const actual = setEntry(builderConfig, {}).entry;
        assert.isString(actual);
      });
    });
  });
});
