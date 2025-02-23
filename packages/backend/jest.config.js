process.env.NODE_ENV = 'test';

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts', 'json'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  testRegex: '.*\\.(spec|e2e)\\.ts$',
  collectCoverageFrom: [
    "**/*.(ts)",
    "!**/node_modules/**",
    "!**/dist/**"
  ],
};
