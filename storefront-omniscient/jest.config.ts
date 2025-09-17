import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const config: Config = {
  testEnvironment: 'jsdom',
  // corre ANTES de cargar libs (polyfills que AntD necesita en import time)
  setupFiles: ['<rootDir>/jest.polyfills.ts'],
  // corre DESPUÉS (matchers, etc.)
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // opcional si usas ESM en package.json: "type": "module"
  // extensionsToTreatAsEsm: ['.ts', '.tsx'],
  // testEnvironmentOptions: { customExportConditions: ['node', 'node-addons'] },
};

export default createJestConfig(config);
