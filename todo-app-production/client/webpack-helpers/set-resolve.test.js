const setResolve = require('./set-resolve');

describe('webpack-helpers/set-resolve', () => {
  it('adds modules, extensions, and aliases', () => {
    const actual = setResolve({}, {});

    expect(actual.resolve.modules).toBeDefined();
    expect(actual.resolve.alias).toBeDefined();
    expect(actual.resolve.extensions).toBeDefined();
  });
});
