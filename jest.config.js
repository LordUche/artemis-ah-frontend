module.exports = {
  coverageDirectory: 'coverage',
  setupFiles: ['<rootDir>/enzyme.config.js'],
  testPathIgnorePatterns: ['/node_modules/', '/tests/', '/src/__tests__/assetsTransformer.js'],
  transformIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/assets/img'],
  collectCoverageFrom: ['**/*.jsx', '!**/node_modules/**', '!**/src/App.jsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/__tests__/assetsTransformer.js'
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
