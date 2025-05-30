export default {
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  testEnvironment: 'node',
  transform: {},
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text'],
  coverageDirectory: '<rootDir>/coverage',
  reporters: [
    'default',
    [
      'jest-junit',
      { outputDirectory: '<rootDir>/reports', outputName: 'junit.xml' },
    ],
  ],
}
