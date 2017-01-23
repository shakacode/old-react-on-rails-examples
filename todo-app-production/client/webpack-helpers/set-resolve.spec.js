const { assert } = require('chai');

const setResolve = require('./set-resolve');

describe('webpack-helpers/set-resolve', () => {
  it('adds modules, extensions, and aliases', () => {
    const actual = setResolve({}, {});

    assert.deepProperty(actual, 'resolve.modules');
    assert.deepProperty(actual, 'resolve.alias');
    assert.deepProperty(actual, 'resolve.extensions');
  });
});
