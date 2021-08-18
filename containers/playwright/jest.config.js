module.exports = {
  preset: 'jest-playwright-preset',
  testRegex: [
    '\\.btest\\.js',
  ],
  testPathIgnorePatterns: ['/node_modules/', '\\.snap$'],
  testEnvironmentOptions: {
    'jest-playwright': {
      browsers: ['chromium'],
    },
  },
};

