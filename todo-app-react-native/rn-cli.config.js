const defaultConfig = require('react-native/local-cli/default.config.js');
const path = require('path');

//TODO: IMO this is a hack to work around the lack of support for ln in the
// React-Native packager.  See here: https://github.com/facebook/react-native/issues/3099

module.exports = {

  getProjectRoots() {
    const roots = defaultConfig.getProjectRoots();
    roots.unshift(path.resolve(__dirname, '../common'));
    return roots;
  },

};
