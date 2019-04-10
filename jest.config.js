module.exports = {
  coverageDirectory: 'coverage',
  setupFiles: ['<rootDir>/enzyme.config.js'],
  testPathIgnorePatterns: ['/node_modules/', '/tests/', '/src/__tests__/assetsTransformer.js'],
  transformIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/assets/img'],
  collectCoverageFrom: ['**/*.{js,jsx}', '!**/node_modules/**', '!jest.config.js', '!webpack.config.js', '!**/src/App.jsx', '!**/coverage/**', '!**/tests/**', '!**/__tests__/**', '!**/index.js'],
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
