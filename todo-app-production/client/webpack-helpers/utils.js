/* eslint-disable no-confusing-arrow */
const path = require('path');

module.exports = {
  addOption: (shouldAdd, option) => shouldAdd ? option : undefined,
  removeEmpty: array => array.filter(item => !!item),
  getEnvVar: ENV_VAR => JSON.stringify(process.env[ENV_VAR]),
  getPort: () => process.env.HOT_RAILS_PORT || 3500,
  getDllPath: file => path.join(__dirname, '..', '..', 'app', 'assets', 'webpack-dll', file || ''),
};
