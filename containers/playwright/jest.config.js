module.exports = {
  preset: 'jest-playwright-preset',
  testRegex: [
    '/test/.*\\.btest\\.js',
  ],
  testPathIgnorePatterns: ['/node_modules/', '\\.snap$'],
  testEnvironmentOptions: {
    'jest-playwright': {
      browsers: ['chromium'],
    },
  },
};

