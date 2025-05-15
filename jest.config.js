export default {
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.js'],
  moduleNameMapper: {
    '\\.(json)$': '<rootDir>/__fixtures__/$1' 
  },
  transform: {},
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text'],
  coverageDirectory: '<rootDir>/coverage',
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: '<rootDir>/reports', outputName: 'junit.xml' }]
  ]
};