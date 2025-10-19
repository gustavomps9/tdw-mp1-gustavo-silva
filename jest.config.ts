import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./", // caminho da tua app Next.js
});

const config: Config = {
  testEnvironment: "jsdom",
  coverageProvider: "v8",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // para resolver os aliases do tsconfig
  },

  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
  ],

  // Usar ts-jest para TypeScript
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },

  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json", // ficheiro tsconfig dedicado para testes
    },
  },
};

export default createJestConfig(config);
