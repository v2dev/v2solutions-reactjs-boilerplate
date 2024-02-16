/* eslint-env node */

const { defaults } = require("jest-config");

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleFileExtensions: ['ts','js', 'tsx', 'json', 'node'],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/path/to/empty-module.js",
  },
};
