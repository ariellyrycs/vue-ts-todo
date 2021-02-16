import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  "testRegex": "(/__tests__/*|(\\.|/)spec)\\.(jsx?|tsx?)$",
  "moduleFileExtensions": [
    "js",
    "ts",
    "json",
    "vue"
  ],
  "transform": {
    ".*\\.(vue)$": "vue-jest",
    "^.+\\.ts?$": "ts-jest",
    "^.+\\.js$": "babel-jest"
  },
  "testURL": "http://localhost/"
};

export default config;