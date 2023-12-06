/* eslint-env node */

const { defaults } = require("jest-config");

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx}"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleFileExtensions: [...defaults.moduleFileExtensions, "mts", "cts", "css"],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/path/to/empty-module.js",
  },
};
