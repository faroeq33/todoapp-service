/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  globalSetup: "<rootDir>/tests/global/globalSetup.ts",
  globalTeardown: "<rootDir>/tests/global/globalTeardown.ts",
  setupFilesAfterEnv: [
    "<rootDir>/tests/global/setupFile.ts"
  ]
};
