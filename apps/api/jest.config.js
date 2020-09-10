const inheritedConfig = require('../../jest.config');
const shelfPreset = require('@shelf/jest-mongodb/jest-preset');

module.exports = {
  ...inheritedConfig,
  ...shelfPreset,
  name: 'api',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  coverageDirectory: '../../coverage/apps/api',
};
