// /** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  globalSetup: "<rootDir>/tests/globalSetup.ts",
  globalTeardown: "<rootDir>/tests/globalTeardown.ts",
  setupFilesAfterEnv: [
    "<rootDir>/tests/setupFile.ts"
  ]
  // collectCoverage: true,
  // coverageReporters: ["text", "html"],
  // coverageDirectory: "<rootDir>/coverage/",
};
