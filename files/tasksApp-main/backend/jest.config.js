export default {
  testEnvironment: "node",
  transform: {},
  // Removed extensionsToTreatAsEsm as .js is already treated as ESM due to "type": "module" in package.json
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  testTimeout: 10000,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: ["json", "text", "lcov", "clover"],
  coveragePathIgnorePatterns: ["/node_modules/"],
  transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$)"],
  // Setup file to handle database setup/teardown
  setupFilesAfterEnv: ["./tests/setup.js"],
};
