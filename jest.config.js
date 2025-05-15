export default {
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.(txt)$': 'jest-transform-stub',
  },
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  reporters: ['default', ['jest-junit', { outputDirectory: 'coverage' }]],
};
